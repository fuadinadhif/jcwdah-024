import express from "express";

import {
  createOrderController,
  payOrderController,
} from "../controllers/order.controller.js";

import { verifyToken, roleGuard } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(verifyToken, roleGuard("CUSTOMER"), createOrderController);
router.route(":orderId/pay").put(payOrderController);

export default router;
