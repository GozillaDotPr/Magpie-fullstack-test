import { NextResponse } from "next/server";

export async function GET() {
  console.log(process.env.DATABASE_URL);
  return Response.json({ ok: process.env.DATABASE_URL });
}