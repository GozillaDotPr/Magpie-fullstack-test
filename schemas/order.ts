
import { z } from "zod";

export const ItemSchema = z.object({
     product_id: z.number()
    .refine(val => typeof val === "number", { message: "User ID must be a number" }),
    quantity	:  z.number()
    .min(0, { message: "Price cannot be negative" }),
})

export const OrderSchema = z.object({
    id: z.number().int().optional(),
    order_id: z.number()
    .refine(val => typeof val === "number", { message: "Order ID must be a number" }),
    user_id: z.number()
    .refine(val => typeof val === "number", { message: "User ID must be a number" }),
    total_price: z.number()
    .min(0, { message: "Price cannot be negative" }),
    status: z.string().nonempty({ message: "Status is required" }),
    items: z.array(ItemSchema),
});

export type OrderType = z.infer<typeof OrderSchema>;
