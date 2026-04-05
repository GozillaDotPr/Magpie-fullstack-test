import db from "@/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const recentOrdersData = await db.order.findMany({
  orderBy: {
    order_external_id: 'desc', 
  },
  take: 5, 
});

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formattedRecentOrders = recentOrdersData.map((order:any) => ({
  id: order.order_external_id, 
  date: new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(order.created_at),
  status: order.status, 
  amount: formatter.format(order.total_price || 0) 
}));

  return NextResponse.json(formattedRecentOrders);
}