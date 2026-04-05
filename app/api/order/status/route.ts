import db from "@/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const groupedOrders = await db.order.groupBy({
  by: ['status'], 
  _count: {
    _all: true,
  },
});
  const formattedForChart = groupedOrders.map((item) => ({
    name: item.status,          
    value: item._count._all,
  }));

  return NextResponse.json(formattedForChart);
}