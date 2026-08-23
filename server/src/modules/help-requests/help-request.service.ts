import { Types } from "mongoose";

import { HelpRequest } from "./help-request.model.js";
import {
  HelpCategory,
  HelpRequestStatus,
} from "./help-request.types.js";

interface CreateHelpRequestInput {
  requesterId: string;
  title: string;
  description: string;
  category: HelpCategory;
}

export const createHelpRequest = async (
  data: CreateHelpRequestInput
) => {
  return HelpRequest.create({
    requesterId: new Types.ObjectId(data.requesterId),
    title: data.title,
    description: data.description,
    category: data.category,
    status: HelpRequestStatus.OPEN,
  });
};

export const getOpenHelpRequests = async () => {
  return HelpRequest.find({
    status: {
      $in: [
        HelpRequestStatus.OPEN,
        HelpRequestStatus.OFFERED,
      ],
    },
  })
    .populate("requesterId", "name email")
    .sort({ createdAt: -1 });
};

export const getHelpRequestById = async (
  helpRequestId: string
) => {
  return HelpRequest.findById(helpRequestId)
    .populate("requesterId", "name email")
    .populate("acceptedHelperId", "name email");
};

export const getMyHelpRequests = async (
  requesterId: string
) => {
  return HelpRequest.find({
    requesterId: new Types.ObjectId(requesterId),
  }).sort({ createdAt: -1 });
};