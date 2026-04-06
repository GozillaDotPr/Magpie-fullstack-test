
import { ProductSchema } from "@/schemas/product"
import { getDataApi } from "@/helper/utils";

import { productRepo } from "@/repository/product.repo";
import { triggerLogRepo } from "@/repository/trigger.log.repo";
import { orderRepo } from "@/repository/order.repo";

import {formatterMoney} from "@/helper/utils"
import { productVariant } from "@/src/variant/product.variant"


const url = process.env.EXTERNAL_API_BASE_URL + "/api/products";


async function getDataFromExternalAPI() {
  return await getDataApi(url);
}

function validateProduct(product: any) {
  const validate = ProductSchema.safeParse(product);
  if (!validate.success) {
    const errorMessages = JSON.stringify(validate.error.flatten().fieldErrors);
    throw new Error(errorMessages);
  }
  return validate.data

}

async function validateProductsAndSave(products: any[]) {
  let summary = { error: 0, success: 0 }

  for (const product of products) {
    try {
      const validatedProduct = validateProduct(product);
      await productRepo.upsertProduct(validatedProduct);
      summary.success++;
    } catch (err: any) {
      summary.error++
    }

  }
  return summary
}


async function saveProductsToDatabase() {
  const products = await getDataFromExternalAPI();

  const productVariants = await productVariant.addVariant(products);

  const processSummary = await validateProductsAndSave(productVariants);
  const trigger_log = {
    type: "product_log",
    success: processSummary.success,
    error: processSummary.error,
  }


  await triggerLogRepo.createDataTriggerLog(trigger_log)
  return processSummary
}


async function groupProductsByCategory() {
  const groupedProducts = await productRepo.groupProductsByCategory();

  const chartData = groupedProducts.map((item: any) => ({
    name: item.category,
    count: item._count._all,
  }));
  return chartData
}


async function getRatingRange() {
  const ratingsData = await productRepo.getMany();

  const tmp = {
    "4.7-5": 0,
    "4.5-4.7": 0,
    "3-4.5": 0,
    "0-3": 0
  }
  const ratings = ratingsData.map((item: any) => {
    const nilaiRating = Number(item.rating) || 0;


    if (nilaiRating >= 4.7) {
      tmp["4.7-5"]++;
    }
    else if (nilaiRating >= 4.5) {

      tmp["4.5-4.7"]++;
    }
    else if (nilaiRating >= 3.0) {

      tmp["3-4.5"]++;
    }
    else {
      tmp["0-3"]++;
    }
  });



  const formattedRatings = Object.keys(tmp).map((key) => ({
    name: key,
    count: tmp[key as keyof typeof tmp]
  }));

  return formattedRatings;
}

async function getTopProductsByPrice() {
  const topProducts = await productRepo.getTopProductsByPrice();
  let no = 1

  const top = topProducts.map((item: any) => ({
    ...item,
    price: formatterMoney(item.price, 2),
    id: no,
    product_id:item.id,
    no: no++,
  }))

  return top
}


async function getTopProductsByRevenue() {
  const reve = await productRepo.getTopProductsByRevenue()
  const val = await Promise.all(
    reve.map(async (item: any,index: number) => ({
      ...item,
      id:index+1,
      product_id:item.id,

      total_revenue:formatterMoney(item.total_revenue,2),
      sold: await orderRepo.getSoldProductOnOrderItems(item.product_id),
    }))
  )
  return val
}
async function getOneProductByID(id: number) {
  return await productRepo.getOneWithID(id);
}
export const productService = {
  saveProductsToDatabase,
  groupProductsByCategory,
  getRatingRange,
  getTopProductsByPrice,
  getTopProductsByRevenue,
  getOneProductByID,
};