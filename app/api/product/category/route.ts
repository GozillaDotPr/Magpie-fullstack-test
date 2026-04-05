import db from "@database/prisma"

import { NextResponse } from "next/server";


export async function GET() {
    const groupedProducts = await db.product.groupBy({
        by: ['category'],
        _count: {
            _all: true,
        },
    });

    const chartData = groupedProducts.map((item) => ({
        name: item.category,
        count: item._count._all,
    }));
    
    return NextResponse.json(chartData);
}