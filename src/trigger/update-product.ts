import { logger, schedules, wait } from "@trigger.dev/sdk/v3";


export const updateProduct = schedules.task({
    id: "update-product",
    // Every hour
    cron: "*/1 * * * *",
    maxDuration: 300, 
    run: async (payload, { ctx }) => {
        logger.log("Updating product", { payload });

        // Wait for 5 seconds
        await wait.for({ seconds: 5 });

        logger.log("Product updated");
    }
});