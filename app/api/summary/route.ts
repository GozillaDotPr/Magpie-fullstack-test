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

  const resultAvgratingProduct = await db.product.aggregate({
    _avg: {
      rating: true,
    },
  });

  const averageRatingProduct = resultAvgratingProduct._avg.rating || 0;

  
  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: "$" + totalRevenue.toFixed(2),
      change: '+20.1%',
      isPositive: true,
      icon: "DollarSign",
    },
    {
      title: 'Total Order Count',
      value: totalOrders,
      change: '+12.5%',
      isPositive: true,
      icon: "ShoppingCart",
    },
    {
      title: 'Average Order Value',
      value: "$" + avgRevenue.toFixed(2),
      change: '-4.3%',
      isPositive: false,
      icon: "BarChart3",
    },
    {
      title: 'Average Product Rating',
      value: averageRatingProduct.toFixed(1) + '/5',
      change: '+2.1%',
      isPositive: true,
      icon: "Star",
    },
  ]


  return NextResponse.json(dashboardStats)
};

