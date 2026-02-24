import express from "express";

import {
  getCustomerById,
  getOrganizerById,
} from "../controllers/user.controller.js";
import { verifyToken, roleGuard } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/profile/customer")
  .get(verifyToken, roleGuard("CUSTOMER"), getCustomerById);
router
  .route("/profile/organizer")
  .get(verifyToken, roleGuard("ORGANIZER"), getOrganizerById);

export default router;
