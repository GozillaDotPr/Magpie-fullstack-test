import { NextResponse } from "next/server";

import { productService } from "@/src/services/product.service";
import db from "@/database/prisma"



export async function GET() {

  const result = await db.order.aggregate({
    _sum: {
      total_price: true,
    },
  });
  const totalOrders = await db.order.count();
  const totalRevenue = result._sum.total_price || 0
  let avgRevenue = 0

  try { 
    avgRevenue = totalRevenue / totalOrders
  } catch{
    console.log("avg error")
  }

  const resultAvgrating = await db.order.aggregate({
    _avg: {
      total_price: true,
    },
  });

  const averageRating = resultAvgrating._avg.total_price || 0;

  const res = {
    totalOrder:totalOrders,
    totalRevenue:totalRevenue.toFixed(2),
    avgRevenue:avgRevenue.toFixed(2),
    averageRating:averageRating.toFixed(2),
  }

  return NextResponse.json(res)
};

