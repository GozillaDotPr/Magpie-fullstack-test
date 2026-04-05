import { logger, schedules, wait } from "@trigger.dev/sdk/v3";
import {productService} from "../services/product.service"


export const updateProduct = schedules.task({
    id: "update-product",
    cron: "* */1 * * *",
    maxDuration: 300, 
    run: async (payload, { ctx }) => {
        logger.log("Updating product", { payload });
        
        try {
        const a = await productService.saveProductsToDatabase();
        } catch (err: any) {
        logger.error("Failed to save products:", err.message);
        }
        
        await wait.for({ seconds: 5 });

        logger.log("Product updated");
    }
});