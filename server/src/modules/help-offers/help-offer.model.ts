import mongoose, { Schema } from "mongoose";

import { HelpOfferStatus } from "./help-offer.types.js";

export interface IHelpOffer extends mongoose.Document {
  requestId: mongoose.Types.ObjectId;
  helperId: mongoose.Types.ObjectId;
  message: string;
  status: HelpOfferStatus;
  createdAt: Date;
  updatedAt: Date;
}

const helpOfferSchema = new Schema<IHelpOffer>(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "HelpRequest",
      required: true,
      index: true,
    },

    helperId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },

    status: {
      type: String,
      enum: Object.values(HelpOfferStatus),
      default: HelpOfferStatus.PENDING,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

helpOfferSchema.index(
  {
    requestId: 1,
    helperId: 1,
  },
  {
    unique: true,
  }
);

export const HelpOffer = mongoose.model<IHelpOffer>(
  "HelpOffer",
  helpOfferSchema
);