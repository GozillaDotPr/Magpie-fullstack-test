import db from "@database/prisma";

import { ProductType } from "@/schemas/product"

interface productRevenue{
  product_id :number,
  name:string,
  total_revenue:number
}

async function upsertProduct(data: ProductType) {
  const productID = data.product_id;

  return await db.product.upsert({
    where: {
      product_external_id: productID,
    },
    create: {
      product_external_id: productID,
      name: data.name,
      description: data.description,
      price: data.price,
      unit: data.unit,
      image: data.image,
      discount: data.discount,
      availability: data.availability,
      brand: data.brand,
      category: data.category,
      rating: data.rating,
      created_at: new Date(),
      updated_at: new Date(),
      product_reviews: {
        create: data.reviews ? data.reviews.map((rev: any) => ({
          user_id: rev.user_id,
          rating: rev.rating,
          comment: rev.comment,
        })) : [],
      },
    },
    update: {
      name: data.name,
      description: data.description,
      price: data.price,
      unit: data.unit,
      image: data.image,
      category: data.category,
      discount: data.discount,
      availability: data.availability,
      brand: data.brand,
      rating: data.rating,
      updated_at: new Date(),
      product_reviews: {
        deleteMany: {},
        create: data.reviews ? data.reviews.map((rev: any) => ({
          user_id: rev.user_id,
          rating: rev.rating,
          comment: rev.comment,
        })) : [],
      },
    },
  });
}

async function groupProductsByCategory() {
  return await db.product.groupBy({
    by: ['category'],
    _count: {
      _all: true,
    },
  });
}

async function getTopProductsByPrice() {
  return await db.product.findMany({
    orderBy: {
      price: 'desc',
    },
    take: 5,
  });
}

async function getMany() {
  return await db.product.findMany();
}

async function getAverageRating() {
  const resultAvgratingProduct = await db.product.aggregate({
    _avg: {
      rating: true,
    },
  });

  return resultAvgratingProduct._avg.rating || 0;
}

async function getTopProductsByRevenue() {
  
  const totalRevenueByProduct = await db.$queryRaw<productRevenue[]>`
  SELECT 
    od.product_id, 
    p.name, 
    SUM(p.price * od.quantity) AS total_revenue
  FROM order_details od
  JOIN products p ON od.product_id = p.product_external_id 
  GROUP BY od.product_id, p.name
  ORDER BY total_revenue DESC limit 5
`;
  
  return totalRevenueByProduct
}

export const productRepo = {
  groupProductsByCategory,
  upsertProduct,
  getTopProductsByPrice,
  getMany,
  getAverageRating,
  getTopProductsByRevenue,
}

