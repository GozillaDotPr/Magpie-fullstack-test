-- CreateTable
CREATE TABLE "trigger_log" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "success" INTEGER NOT NULL,
    "error" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trigger_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_details_id_idx" ON "order_details"("id");

-- CreateIndex
CREATE INDEX "orders_order_external_id_id_updated_at_idx" ON "orders"("order_external_id", "id", "updated_at");

-- CreateIndex
CREATE INDEX "products_product_external_id_id_updated_at_idx" ON "products"("product_external_id", "id", "updated_at");
