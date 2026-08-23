import mongoose, { Document, Schema } from "mongoose";
import { HelpCategory, HelpRequestStatus } from "./help-request.types.js";

export interface IHelpRequest extends Document {
  requesterId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: HelpCategory;
  status: HelpRequestStatus;
  acceptedHelperId?: mongoose.Types.ObjectId;
  endedAt?: Date;
  endedReason?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const helpRequestSchema = new Schema<IHelpRequest>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 120,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 2000,
    },

    category: {
      type: String,
      enum: Object.values(HelpCategory),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(HelpRequestStatus),
      default: HelpRequestStatus.OPEN,
      index: true,
    },

    acceptedHelperId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    endedAt: {
      type: Date,
    },

    endedReason: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    expiresAt: {
      type: Date,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HelpRequest = mongoose.model<IHelpRequest>(
  "HelpRequest",
  helpRequestSchema
);