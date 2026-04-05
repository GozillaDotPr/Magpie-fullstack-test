import { getDataApi } from "@/helper/utils";
import { OrderSchema } from "@/schemas/order";

import {orderRepo} from "@/src/repository/order.repo"
import { triggerLogRepo } from "@/src/repository/trigger.log.repo";

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
}


async function validateOrderAndSave(orders: any[]) {
  var summary = {error:0,success:0}

  for (const order of orders) {
    try{
      validateOrder(order);
      await orderRepo.UpsertOrder(order);
      summary.success++;
    }catch(err:any){
      summary.error++
    }

  }
  return summary
}

async function saveOrdersToDatabase() {
  const orders = await getDataFromExternalAPI();
  const processSummary = await validateOrderAndSave(orders);
  const trigger_log = {
    type:"order_log",
    success: processSummary.success,
    error : processSummary.error,
  } 

  try{
    await triggerLogRepo.createDataTriggerLog(trigger_log)
  }catch{
    console.error("Error creating trigger log")
  }
}

export const orderService = {
    saveOrdersToDatabase
}