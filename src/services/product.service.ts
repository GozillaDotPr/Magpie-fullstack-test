import db from "@database/prisma";
import {
  priceValidator,
  ratingValidator,
  discountValidator,
} from "@/helper/validator";

import { getDataApi } from "@/helper/utils";

const url = process.env.EXTERNAL_API_BASE_URL + "/api/products";


async function getDataFromExternalAPI() {
  return await getDataApi(url);
}

function validateProduct(product: any) {
  priceValidator(product.price);
  ratingValidator(product.rating);
  discountValidator(product.discount);
}


function validateProducts(products: any[]) {
  for (const product of products) {
    validateProduct(product);
  }
}


async function saveProductsToDatabase() {
  const products = await getDataFromExternalAPI();

  validateProducts(products);

  await db.product.createMany({
    data: products,
  });

  console.log(`Saved ${products.length} products to the database.`);

  return {
    success: true,
  };
}


export const productService = {
  getDataFromExternalAPI,
  saveProductsToDatabase,
};