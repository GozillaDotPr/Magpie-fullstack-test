import { orderService } from "@/services/order.service";
import { NextResponse } from "next/server";

export async function GET() {
    const revenueData = await orderService.getRevenueData();
  return NextResponse.json(revenueData);
}


