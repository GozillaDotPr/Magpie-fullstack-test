import { logger, schedules } from "@trigger.dev/sdk/v3";
import { orderService } from "../services/order.service"


export const updateOrder = schedules.task({
    id: "update-order",
    cron: "* */1 * * *",
    retry: {
        maxAttempts: 3,
        factor: 2,
        minTimeoutInMs: 1000 * 60,
        maxTimeoutInMs: 1000 * 60 * 10,
    },
    maxDuration: 300,
    run: async (payload, { ctx }) => {
        logger.log("Starting product update sync", { payload });

        try {
            const result = await orderService.saveOrdersToDatabase();

            if (result.error > 0) {
                logger.warn(`${result.error} records failed validation or saving`, { result });
            } else {
                logger.log("All orders updated successfully", { result });
            }

        } catch (error: any) {
            logger.error("CRITICAL: Failed to update orders", {
                error: error.message,
                stack: error.stack
            });

            throw error;
        }
    }
});