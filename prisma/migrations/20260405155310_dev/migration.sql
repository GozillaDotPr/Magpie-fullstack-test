-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_order_id_fkey";

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_external_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_external_id") ON DELETE RESTRICT ON UPDATE CASCADE;
