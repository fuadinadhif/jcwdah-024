import express from "express";

import { createEventController } from "../controllers/event.controller.js";

import { upload } from "../middlewares/upload.middleware.js";
import { roleGuard, verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    roleGuard("ORGANIZER"),
    upload.single("singleImage"),
    createEventController,
  );
// router.route("/").post(upload.array("arrayImages"), createEventController);

export default router;
