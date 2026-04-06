import { NextResponse } from "next/server"
import { productService } from "@/services/product.service";

export async function GET() {
  const topProducts = await productService.getTopProductsByPrice()
  return NextResponse.json(topProducts);
}