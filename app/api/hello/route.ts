import { NextResponse } from "next/server";

import db from "@database/prisma";

export async function GET() {
  console.log(process.env.DATABASE_URL);
  const orders = await db.order.findMany();
  return Response.json({ ok: process.env.DATABASE_URL, orders });
}