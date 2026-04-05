
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
  return validate.data

}

async function validateProductsAndSave(products: any[]) {
  let summary = {error:0,success:0}

  for (const product of products) {
    try{
      const validatedProduct = validateProduct(product);
      await productRepo.upsertProduct(validatedProduct);
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

  
  await triggerLogRepo.createDataTriggerLog(trigger_log)
  return processSummary
}


export const productService = {
  saveProductsToDatabase,
};