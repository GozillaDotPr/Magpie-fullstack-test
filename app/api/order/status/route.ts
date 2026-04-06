import { NextResponse } from "next/server";
import { orderService } from "@/services/order.service";


export async function GET() {
  const formattedForChart = await orderService.getOrderStatus();

  return NextResponse.json(formattedForChart);
}