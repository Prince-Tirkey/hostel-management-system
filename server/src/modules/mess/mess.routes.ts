import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";
import { listReviews, createReview, addWastage, wastageSummary } from "./mess.controller.js";

const router=Router();
router.use(requireAuth);
router.get("/reviews",listReviews);
router.post("/reviews",createReview);
router.post("/wastage",requireRole("MESS_COORDINATOR","WARDEN","ADMIN"),addWastage);
router.get("/wastage/summary",requireRole("MESS_COORDINATOR","WARDEN","ADMIN"),wastageSummary);
export default router;
