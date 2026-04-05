import { NextResponse } from "next/server";

import { productService } from "@/src/services/product.service";



export async function GET() {
  console.log(process.env.DATABASE_URL);
  const a = await productService.saveProductsToDatabase();
  return Response.json({ ok: "hehe" });
}