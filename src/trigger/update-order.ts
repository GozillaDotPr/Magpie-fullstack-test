import { logger, schedules, wait } from "@trigger.dev/sdk/v3";


export const updateOrder = schedules.task({
    id: "update-order",
    // Every hour
    cron: "*/1 * * * *",
    maxDuration: 300, 
    run: async (payload, { ctx }) => {
        logger.log("Updating order", { payload });

        // Wait for 5 seconds
        await wait.for({ seconds: 5 });

        logger.log("Order updated");
    }
});