import db from "@database/prisma";

async function createDataTriggerLog(data:any){
    return  db.trigger_log.create({
      data: {
        type: data.type,
        success: data.success,
        error: data.error,
        created_at: new Date(),
      }
    });
}


export const triggerLogRepo = {
    createDataTriggerLog
}