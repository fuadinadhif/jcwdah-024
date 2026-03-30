import { OrderStatus } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/app-error.js";
import { orderQueue } from "../queues/order.queue.js";

export async function createOrderService(
  totalAmount: number,
  eventId: number,
  customerId: number,
) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  const order = await prisma.order.create({
    data: { totalAmount, eventId, customerId },
  });

  await orderQueue.add(
    "expire-unpaid-orders",
    { orderId: order.id },
    {
      delay: 1000 * 20,
      jobId: `expire-${order.id}`,
    },
  );

  return order;
}

export async function payOrderService(orderId: number) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  if (order.status !== "WAITING_PAYMENT") {
    throw new AppError("Order cannot be paid", 400);
  }

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: "PAID" },
  });

  await orderQueue.remove(`expire-${order.id}`);

  return updated;
}

export async function expireUnpaidOrdersService() {
  const twoMinutesAgo = new Date(Date.now() - 1000 * 60 * 2);

  const expiredOrders = await prisma.order.updateMany({
    where: {
      status: OrderStatus.WAITING_PAYMENT,
      createdAt: { lte: twoMinutesAgo },
    },
    data: {
      status: OrderStatus.EXPIRED,
    },
  });

  return expiredOrders;
}

export async function expireUnpaidSingleOrderService(orderId: number) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    return;
  }

  if (order.status === "WAITING_PAYMENT") {
    const result = await prisma.order.update({
      where: { id: orderId },
      data: { status: "EXPIRED" },
    });

    return result;
  }
}
