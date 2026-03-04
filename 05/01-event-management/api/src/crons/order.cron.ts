import { CronJob } from "cron";

import { expireUnpaidOrdersService } from "../services/order.service.js";

export const expireUnpaidOrderJob = new CronJob(
  "*/5 * * * * *", // cron time
  async () => {
    console.info(`Checking expired orders...`);

    const result = await expireUnpaidOrdersService();

    if (result.count > 0) {
      console.info(`${result.count} orders is expired`);
    }
  }, // callback to be called when cron time comes
  null, // on complete
  true, // delay time
);
