import express from "express";

import {
  getCustomerById,
  getOrganizerById,
} from "../controllers/user.controller.js";
import { verifyToken, roleGuard } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/customer/profile")
  .get(verifyToken, roleGuard("CUSTOMER"), getCustomerById);
router
  .route("/organizer/profile")
  .get(verifyToken, roleGuard("ORGANIZER"), getOrganizerById);

export default router;
