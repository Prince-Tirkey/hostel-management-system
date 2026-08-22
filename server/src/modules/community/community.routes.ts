import { Router } from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { listItems, createItem, requestItem } from "./community.controller.js";

const router = Router();
router.use(requireAuth);
router.get("/items", listItems);
router.post("/items", createItem);
router.post("/items/:itemId/requests", requestItem);
export default router;
