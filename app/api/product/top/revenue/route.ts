import { NextResponse } from "next/server"
import { productService } from "@/services/product.service";

export async function GET() {
  const topProducts = await productService.getTopProductsByRevenue()
  return NextResponse.json(topProducts);
}