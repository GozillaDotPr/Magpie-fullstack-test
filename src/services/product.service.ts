import db from "@database/prisma";

import {ProductSchema} from "@/schemas/product"
import { getDataApi } from "@/helper/utils";

import { productRepo } from "@/src/repository/product.repo";

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
  for (const product of products) {
    // clean or error
    validateProduct(product);
    var productID = parseInt(product.product_id);
    var existsProduct = await productRepo.checkProductExists(productID);

    if (existsProduct) {
      await productRepo.updateDataProduct(product);
    }else{
      await productRepo.createDataProduct(product);
    }

  }
}


async function saveProductsToDatabase() {
  const products = await getDataFromExternalAPI();
  try{
    await validateProductsAndSave(products);
  }catch(err){
    console.log(err)
  }
  
  return {
    success: true,  
    data : products,
  };
}


export const productService = {
  getDataFromExternalAPI,
  saveProductsToDatabase,
};