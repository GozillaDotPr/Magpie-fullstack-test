import { logger, schedules, wait } from "@trigger.dev/sdk/v3";

import {orderService} from "../services/order.service"


export const updateOrder = schedules.task({
    id: "update-order",
    cron: "*/1 * * * *",
    maxDuration: 300, 
    run: async (payload, { ctx }) => {
        logger.log("Updating order", { payload });

        try {
            const a = await orderService.saveOrdersToDatabase();
        } catch (err: any) {
            logger.error("Failed to save orders:", err.message);
        }

        await wait.for({ seconds: 5 });

        logger.log("Order updated");
    }
});