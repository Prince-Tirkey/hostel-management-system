import mongoose, { Schema } from "mongoose";

export const COMPLAINT_CATEGORIES = [
  "HEALTH","MAINTENANCE","ELECTRICITY","PLUMBING","CLEANLINESS",
  "WATER","INTERNET","SECURITY","MESS","OTHER",
] as const;

export const COMPLAINT_STATUS = [
  "OPEN","ACKNOWLEDGED","IN_PROGRESS","RESOLVED","REJECTED",
] as const;

export const COMPLAINT_SEVERITIES = ["LOW","MEDIUM","HIGH","CRITICAL"] as const;

const complaintSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hostelId: { type: Schema.Types.ObjectId, ref: "Hostel" },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, enum: COMPLAINT_CATEGORIES, default: "OTHER" },
  severity: { type: String, enum: COMPLAINT_SEVERITIES, default: "MEDIUM" },
  urgencyScore: { type: Number, min: 0, max: 100, default: 50 },
  priorityScore: { type: Number, min: 0, max: 100, default: 50 },
  status: { type: String, enum: COMPLAINT_STATUS, default: "OPEN" },
  aiProcessed: { type: Boolean, default: false },
  aiReason: { type: String, default: "" },
  resolvedAt: Date,
}, { timestamps: true });

complaintSchema.index({ hostelId: 1, status: 1, priorityScore: -1 });
complaintSchema.index({ category: 1, createdAt: -1 });

export const Complaint = mongoose.model("Complaint", complaintSchema);
