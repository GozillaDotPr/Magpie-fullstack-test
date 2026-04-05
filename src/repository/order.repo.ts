import db from "@database/prisma";
import { OrderType } from "@/schemas/order";

async function upsertOrder(data: OrderType) {
    const orderid = data.order_id;

    return await db.order.upsert({
        where: { order_external_id: orderid },
        create : {
            order_external_id : data.order_id,
            user_id : data.user_id,
            total_price: data.total_price,
            status : data.status,
            created_at: new Date(),
            updated_at: new Date(),
            order_details: {
                create: data.items ? data.items.map((item: any) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                    })) : [],
                },
        },
        update:{
            order_external_id : data.order_id,
            user_id : data.user_id,
            total_price: data.total_price,
            status : data.status,
            updated_at: new Date(),
            order_details:{
                deleteMany:{},
                create: data.items ? data.items.map((item: any) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                    })) : [],
            }
        }
        
    });
}

export const orderRepo = {
    upsertOrder
}
