import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { Complaint } from "./complaint.model.js";
import { classifyComplaint, summarizeComplaints } from "../ai/ai.service.js";

export async function createComplaint(req: AuthenticatedRequest, res: Response) {
  const { title, description } = req.body;
  if (!title || !description) return res.status(400).json({ success:false, message:"Title and description are required", data:null, timestamp:new Date().toISOString() });
  const complaint = await Complaint.create({ ...req.body, studentId: req.user!.userId });
  try {
    const ai = await classifyComplaint({ title, description });
    Object.assign(complaint, { ...ai, aiProcessed: true, aiReason: ai.reason });
    await complaint.save();
  } catch {
    // AI is optional: the complaint remains usable if the provider is unavailable.
  }
  return res.status(201).json({ success:true, message:"Complaint created", data:complaint, timestamp:new Date().toISOString() });
}

export async function listComplaints(_req: AuthenticatedRequest, res: Response) {
  const complaints = await Complaint.find().sort({ priorityScore: -1, createdAt: -1 }).limit(100);
  return res.json({ success:true, message:"Complaints fetched", data:complaints, timestamp:new Date().toISOString() });
}

export async function supervisorSummary(_req: AuthenticatedRequest, res: Response) {
  const complaints = await Complaint.find({ status: { $ne: "RESOLVED" } }).sort({ priorityScore: -1 }).limit(200).lean();
  try {
    const summary = await summarizeComplaints(complaints.map(c => ({
      title:c.title, description:c.description, category:c.category, severity:c.severity,
    })));
    return res.json({ success:true, message:"AI supervisor summary generated", data:summary, timestamp:new Date().toISOString() });
  } catch {
    return res.status(503).json({ success:false, message:"AI summary is unavailable. Check GEMINI_API_KEY.", data:null, timestamp:new Date().toISOString() });
  }
}
