import mongoose, { Schema } from "mongoose";

const messReviewSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hostelId: { type: Schema.Types.ObjectId, ref: "Hostel" },
  mealType: { type: String, enum: ["BREAKFAST","LUNCH","SNACKS","DINNER"], required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  foodQuality: { type: Number, min: 1, max: 5 },
  hygiene: { type: Number, min: 1, max: 5 },
  taste: { type: Number, min: 1, max: 5 },
  comment: { type: String, trim: true, default: "" },
  status: { type: String, enum: ["VISIBLE","HIDDEN"], default: "VISIBLE" },
}, { timestamps: true });

messReviewSchema.index({ hostelId: 1, createdAt: -1 });

export const MessReview = mongoose.model("MessReview", messReviewSchema);
