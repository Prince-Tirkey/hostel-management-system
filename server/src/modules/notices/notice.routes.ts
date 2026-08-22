import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/rbac.middleware.js";
import { listNotices, createNotice } from "./notice.controller.js";

const router=Router();
router.use(requireAuth);
router.get("/", listNotices);
router.post("/", requireRole("WARDEN","ADMIN"), createNotice);
export default router;
