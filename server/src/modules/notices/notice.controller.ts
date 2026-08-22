import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { Notice } from "./notice.model.js";

export async function listNotices(_req: AuthenticatedRequest, res: Response) {
  const notices = await Notice.find({ $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }] })
    .sort({ isPinned:-1, createdAt:-1 }).limit(100);
  res.json({success:true,message:"Notices fetched",data:notices,timestamp:new Date().toISOString()});
}

export async function createNotice(req: AuthenticatedRequest, res: Response) {
  const notice = await Notice.create({...req.body, createdBy:req.user!.userId});
  res.status(201).json({success:true,message:"Notice published",data:notice,timestamp:new Date().toISOString()});
}
