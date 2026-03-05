import { orderQueue } from "./order.queue.js";

export async function registerOrderJob() {
  await orderQueue.add(
    "expire-unpaid-orders",
    {},
    {
      repeat: {
        every: 5000,
      },
      // removeOnComplete: true,
      removeOnFail: true,
    },
  );

  console.info(`Expire unpaid order job scheduled (every 5s)`);
}
