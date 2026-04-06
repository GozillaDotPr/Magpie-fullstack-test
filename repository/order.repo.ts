import db from "@database/prisma";
import { OrderType } from "@/schemas/order";

async function upsertOrder(data: OrderType) {
    const orderid = data.order_id;

    return await db.order.upsert({
        where: { order_external_id: orderid },
        create: {
            order_external_id: data.order_id,
            user_id: data.user_id,
            total_price: data.total_price,
            status: data.status,
            created_at: new Date(),
            updated_at: new Date(),
            order_details: {
                create: data.items ? data.items.map((item: any) => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                })) : [],
            },
        },
        update: {
            status: data.status,
            updated_at: new Date(),
        }

    });
}

async function groupOrdersByStatus() {
    return await db.order.groupBy({
        by: ['status'],
        _count: {
            _all: true,
        },
    });
}

async function getRecentOrders() {
    return await db.order.findMany({
        orderBy: {
            order_external_id: 'desc',
        },
        take: 5,
    });
}

async function totalOrder() {
    
  return await db.order.count();
}

async function getTotalRevenue() {
    const result = await db.order.aggregate({
    _sum: {
      total_price: true,
    },
  });

  const totalRevenue = result._sum.total_price || 0

  return totalRevenue
}

export const orderRepo = {
    upsertOrder,
    groupOrdersByStatus,
    getRecentOrders,
    totalOrder,
    getTotalRevenue,
}
