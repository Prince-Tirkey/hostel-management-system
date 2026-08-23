import { Router } from "express";

import { requireAuth } from "../../middlewares/auth.middleware.js";

import {
  acceptHelpOfferController,
  createHelpOfferController,
  getOffersForRequestController,
  rejectHelpOfferController,
} from "./help-offer.controller.js";

const router = Router();

router.use(requireAuth);

router.post(
  "/:requestId",
  createHelpOfferController
);

router.get(
  "/:requestId",
  getOffersForRequestController
);

router.post(
  "/:requestId/:offerId/accept",
  acceptHelpOfferController
);

router.post(
  "/:requestId/:offerId/reject",
  rejectHelpOfferController
);

export default router;