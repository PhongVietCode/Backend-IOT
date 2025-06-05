import dayjs from 'dayjs';
import cron from 'node-cron';
import { orm } from './orm';
export const runDeleteWebhook = () => {
    cron.schedule('* * * * *', async () => {
        const now = dayjs().tz('Asia/Hong_Kong').toISOString();
        console.log(`[${now}] Running cron job to update Booking status to DELETED`);
        try {
            const result = await orm.cardAccessWebhook.deleteMany({
                where: {
                    expired_at: {
                        lte: now
                    }
                }
            });
            console.log(`[${now}] Updated ${result.count} Booking records to DELETED`);
        } catch (error: any) {
            console.error(`[${now}] Cron job error:`, error.message);
        }
    });
}