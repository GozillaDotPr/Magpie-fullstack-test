import db from "@database/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const topProducts = await db.product.findMany({
    orderBy: {
      price: 'desc',
    },
    take: 5,
  });

  return NextResponse.json(topProducts);
}