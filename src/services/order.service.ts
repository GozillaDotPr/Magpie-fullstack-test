import { getDataApi } from "@/helper/utils";
import { OrderSchema } from "@/schemas/order";

import {orderRepo} from "@/src/repository/order.repo"
import { triggerLogRepo } from "@/src/repository/trigger.log.repo";

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

export const orderService = {
    saveOrdersToDatabase
}