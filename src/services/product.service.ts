import db from "@database/prisma";

import {ProductType,ProductSchema} from "@/schemas/product"
import { getDataApi } from "@/helper/utils";
import { error } from "console";

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

async function validateProducts(products: any[]) {
  for (const product of products) {
    validateProduct(product);
    await createDataProduct(product)
  }
}

async function createDataProduct(data:any){
    return  db.product.create({
      data: {
        product_external_id: data.product_id,
        name: data.name,
        description: data.description,
        price: data.price,
        unit: data.unit,
        image: data.image,
        discount: data.discount,
        availability: data.availability,
        brand: data.brand,
        rating: data.rating,

        created_at: new Date(), 
        updated_at: new Date(),
      },
    });
}

async function saveProductsToDatabase() {
  const products = await getDataFromExternalAPI();
  try{
    await validateProducts(products);

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