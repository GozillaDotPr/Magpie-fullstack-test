import db from "@database/prisma"

import { NextResponse } from "next/server";
import { productService } from "@/services/product.service";


export async function GET() {
    const chartData = await productService.groupProductsByCategory();
    return NextResponse.json(chartData);
}