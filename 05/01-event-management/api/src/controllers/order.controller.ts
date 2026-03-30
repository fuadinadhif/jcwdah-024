import type { Request, Response, NextFunction } from "express";
import {
  createOrderService,
  payOrderService,
} from "../services/order.service.js";

export async function createOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { eventId, totalAmount } = req.body as {
      eventId: number;
      totalAmount: number;
    };
    const customerId = req?.user?.id;

    const order = await createOrderService(totalAmount, eventId, customerId);

    res.status(201).json({ message: "Order created", data: order });
  } catch (error) {
    next(error);
  }
}

export async function payOrderController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { orderId } = req.params;

    const order = await payOrderService(Number(orderId));

    res.status(200).json({ message: "Order paid", data: order });
  } catch (error) {
    next(error);
  }
}
