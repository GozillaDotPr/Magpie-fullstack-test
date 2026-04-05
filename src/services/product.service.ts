
import {ProductSchema} from "@/schemas/product"
import { getDataApi } from "@/helper/utils";

import { productRepo } from "@/src/repository/product.repo";
import { triggerLogRepo } from "@/src/repository/trigger.log.repo";


const url = process.env.EXTERNAL_API_BASE_URL + "/api/products";


async function getDataFromExternalAPI() {
  return await getDataApi(url);
}

function validateProduct(product: any) {
  const validate = ProductSchema.safeParse(product);
  if (!validate.success){
    const errorMessages = JSON.stringify(validate.error.flatten().fieldErrors);
    throw new Error(errorMessages);
  }
}

async function validateProductsAndSave(products: any[]) {
  var summary = {error:0,success:0}

  for (const product of products) {
    // clean or error
    try{
      validateProduct(product);
      await productRepo.upsertProduct(product);
      summary.success++;
    }catch(err:any){
      summary.error++
    }

  }
  return summary
}


async function saveProductsToDatabase() {
  const products = await getDataFromExternalAPI();
  const processSummary = await validateProductsAndSave(products);
  const trigger_log = {
    type:"product_log",
    success: processSummary.success,
    error : processSummary.error,
  } 

  try{
    await triggerLogRepo.createDataTriggerLog(trigger_log)
  }catch{
    console.error("Error creating trigger log")
  }
}


export const productService = {
  getDataFromExternalAPI,
  saveProductsToDatabase,
};