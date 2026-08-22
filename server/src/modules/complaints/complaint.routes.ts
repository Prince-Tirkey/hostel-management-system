import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";
import { createComplaint, listComplaints, supervisorSummary } from "./complaint.controller.js";

const router = Router();
router.use(requireAuth);
router.get("/", listComplaints);
router.post("/", createComplaint);
router.get("/ai/summary", requireRole("WARDEN", "ADMIN", "STUDENT_COORDINATOR"), supervisorSummary);
export default router;
