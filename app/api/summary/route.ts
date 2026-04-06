import { NextResponse } from "next/server";

import db from "@/database/prisma"
import { summaryService } from "@/services/summary";



export async function GET() {
  const dashboardStats = await summaryService.getSummaryData()

  return NextResponse.json(dashboardStats)
};

