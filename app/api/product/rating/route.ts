import { NextResponse } from "next/server";

import { productService } from "@/services/product.service";

export async function GET() {
  const formattedRatings = await productService.getRatingRange();
  return NextResponse.json(formattedRatings);
  }