import { z } from "zod";

const ReviewSchema = z.object({
  user_id: z.number().int(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Comment cannot be empty"),
});

export const ProductSchema = z.object({
  id: z.number().int().optional(),
  product_id: z.number()
    .refine(val => typeof val === "number", { message: "Product external ID must be a number" }),
  name: z.string().nonempty({ message: "Product name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  category: z.string().nonempty({ message: "Category is required" }),
  price: z.number()
    .min(0, { message: "Price cannot be negative" }),
  unit: z.string().nonempty({ message: "Unit is required" }),
  image: z.string().url({ message: "Image must be a valid URL" }),
  discount: z.number()
    .min(0, { message: "Discount cannot be negative" }),
  availability: z.boolean(),
  brand: z.string().nonempty({ message: "Brand is required" }),
  rating: z.number()
    .min(0, { message: "Rating cannot be negative" })
    .max(5, { message: "Rating cannot exceed 5" }),

  reviews: z.array(ReviewSchema).optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;