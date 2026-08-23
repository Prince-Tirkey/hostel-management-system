import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware.js";

import {
  createHelpRequestController,
  getHelpRequestByIdController,
  getMyHelpRequestsController,
  getOpenHelpRequestsController,
} from "./help-request.controller.js";

const router = Router();

router.use(requireAuth);

router.post("/", createHelpRequestController);

router.get("/", getOpenHelpRequestsController);

router.get("/my", getMyHelpRequestsController);

router.get("/:id", getHelpRequestByIdController);

export default router;