import { getDataApi } from "@/helper/utils";
import { OrderSchema } from "@/schemas/order";

import {orderRepo} from "@/repository/order.repo"
import { triggerLogRepo } from "@/repository/trigger.log.repo";

import {orderVariant} from "@/src/variant/order.varian"

const url = process.env.EXTERNAL_API_BASE_URL + "/api/orders";

async function getDataFromExternalAPI() {
  return await getDataApi(url);
}

function validateOrder(order: any) {
  const validate = OrderSchema.safeParse(order);
  if (!validate.success){
    const errorMessages = JSON.stringify(validate.error.flatten().fieldErrors);
    throw new Error(errorMessages);
  }
  return validate.data
}


async function validateOrderAndSave(orders: any[]) {
  let summary = {error:0,success:0}

  for (const order of orders) {
    try{
      const validatedOrder = validateOrder(order);
      await orderRepo.upsertOrder(validatedOrder);
      summary.success++;
    }catch(err:any){
      summary.error++
    }

  }
  return summary
}

async function saveOrdersToDatabase() {
  const orders = await getDataFromExternalAPI();
  const order_with_variants = await orderVariant.addVariant(orders);
  const processSummary = await validateOrderAndSave(order_with_variants);
  const trigger_log = {
    type:"order_log",
    success: processSummary.success,
    error : processSummary.error,
  } 

  await triggerLogRepo.createDataTriggerLog(trigger_log)

  return processSummary
}

async function getOrderStatus() {
  const groupedOrders = await orderRepo.groupOrdersByStatus();
  
  const formattedForChart = groupedOrders.map((item:any) => ({
    name: item.status,          
    value: item._count._all,
  }));
  return formattedForChart
}

async function getRecentOrders() {
  const recentOrdersData = await orderRepo.getRecentOrders();
  
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    let no = 1;
  
    const formattedRecentOrders = recentOrdersData.map((order: any) => ({
      id: no,
      date: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(order.created_at),
      status: order.status,
      amount: formatter.format(order.total_price || 0),
      no: no++
    }));

  return formattedRecentOrders
}

export const orderService = {
    saveOrdersToDatabase,
    getOrderStatus,
    getRecentOrders
}