import mongoose, { Schema } from "mongoose";

const lendItemSchema = new Schema(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    category: {
      type: String,
      enum: ["CYCLE", "LAPTOP", "BOOK", "FOOD", "ELECTRONICS", "OTHER"],
      default: "OTHER",
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "RESERVED", "LENT", "CLOSED"],
      default: "AVAILABLE",
    },
    locationHint: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export const LendItem = mongoose.model("LendItem", lendItemSchema);

const borrowRequestSchema = new Schema(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "LendItem", required: true },
    borrowerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "RETURNED", "CANCELLED"],
      default: "PENDING",
    },
    dueAt: Date,
  },
  { timestamps: true },
);

export const BorrowRequest = mongoose.model("BorrowRequest", borrowRequestSchema);
