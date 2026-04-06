import { NextResponse } from "next/server";
import { orderService } from "@/services/order.service";
export async function GET() {
  const formattedRecentOrders = await orderService.getRecentOrders();
  return NextResponse.json(formattedRecentOrders);
}