import { Types } from "mongoose";

import { HelpOffer } from "./help-offer.model.js";
import { HelpOfferStatus } from "./help-offer.types.js";

import { HelpRequest } from "../help-requests/help-request.model.js";

import { HelpRequestStatus } from "../help-requests/help-request.types.js";
import { AppError } from "../../utils/appError.js";

interface CreateHelpOfferInput {
  requestId: string;
  helperId: string;
  message: string;
}

export const createHelpOffer = async (data: CreateHelpOfferInput) => {
  const request = await HelpRequest.findById(data.requestId);

  if (!request) {
    throw new AppError("Help request not found", 404, "REQUEST_NOT_FOUND");
  }

  if (request.status !== HelpRequestStatus.OPEN && request.status !== HelpRequestStatus.OFFERED) {
    throw new AppError("This help request is no longer accepting offers", 400, "REQUEST_CLOSED");
  }

  // Requester cannot offer help on their own request
  if (request.requesterId.toString() === data.helperId) {
    throw new AppError("You cannot offer help on your own request", 400, "SELF_HELP_NOT_ALLOWED");
  }

  // Check if this student already offered help
  const existingOffer = await HelpOffer.findOne({
    requestId: new Types.ObjectId(data.requestId),
    helperId: new Types.ObjectId(data.helperId),
  });

  if (existingOffer) {
    throw new AppError("You have already offered help for this request", 409, "DUPLICATE_OFFER");
  }

  const offer = await HelpOffer.create({
    requestId: new Types.ObjectId(data.requestId),
    helperId: new Types.ObjectId(data.helperId),
    message: data.message,
    status: HelpOfferStatus.PENDING,
  });

  // Change request status to OFFERED
  if (request.status === HelpRequestStatus.OPEN) {
    request.status = HelpRequestStatus.OFFERED;
    await request.save();
  }

  return offer;
};

export const getOffersForRequest = async (requestId: string, requesterId: string) => {
  const request = await HelpRequest.findById(requestId);

  if (!request) {
    throw new AppError("Help request not found", 404, "HELP_REQUEST_NOT_FOUND");
  }

  // Only the requester can see offers
  if (request.requesterId.toString() !== requesterId) {
    throw new AppError("Only the requester can view help offers", 403, "VIEW_OFFERS_FORBIDDEN");
  }

  return HelpOffer.find({
    requestId: new Types.ObjectId(requestId),
  })
    .populate("helperId", "fullName email role")
    .sort({ createdAt: -1 });
};

export const acceptHelpOffer = async (requestId: string, offerId: string, requesterId: string) => {
  const request = await HelpRequest.findById(requestId);

  if (!request) {
    throw new AppError("Help request not found", 404, "HELP_REQUEST_NOT_FOUND");
  }

  // Only the requester can accept an offer
  if (request.requesterId.toString() !== requesterId) {
    throw new AppError("Only the requester can accept a help offer", 403, "ACCEPT_OFFER_FORBIDDEN");
  }

  // Request must still be accepting offers
  if (request.status !== HelpRequestStatus.OPEN && request.status !== HelpRequestStatus.OFFERED) {
    throw new AppError("This help request is no longer accepting offers", 400, "REQUEST_CLOSED");
  }

  const offer = await HelpOffer.findOne({
    _id: offerId,
    requestId,
  });

  if (!offer) {
    throw new AppError("Help offer not found", 403, "HELP_OFFER_NOT_FOUND");
  }

  if (offer.status !== HelpOfferStatus.PENDING) {
    throw new AppError("This help offer is no longer pending", 400, "OFFER_NOT_PENDING");
  }

  // Accept selected offer
  offer.status = HelpOfferStatus.ACCEPTED;
  await offer.save();

  // Associate helper with the request
  request.acceptedHelperId = offer.helperId;
  request.status = HelpRequestStatus.ACTIVE;

  await request.save();

  // Reject all other pending offers
  await HelpOffer.updateMany(
    {
      requestId,
      _id: { $ne: offerId },
      status: HelpOfferStatus.PENDING,
    },
    {
      $set: {
        status: HelpOfferStatus.REJECTED,
      },
    },
  );

  return {
    request,
    acceptedOffer: offer,
  };
};

export const rejectHelpOffer = async (requestId: string, offerId: string, requesterId: string) => {
  const request = await HelpRequest.findById(requestId);

  if (!request) {
    throw new AppError("Help request not found", 403, "HELP_REQUEST_NOT_FOUND");
  }

  if (request.requesterId.toString() !== requesterId) {
    throw new AppError("Only the requester can reject a help offer", 403, "REJECT_OFFER_FORBIDDEN");
  }

  const offer = await HelpOffer.findOne({
    _id: offerId,
    requestId,
  });

  if (!offer) {
    throw new AppError("Help offer not found", 403, "HELP_OFFER_NOT_FOUND");
  }

  if (offer.status !== HelpOfferStatus.PENDING) {
    throw new AppError("This help offer is no longer pending", 400, "OFFER_NOT_PENDING");
  }

  offer.status = HelpOfferStatus.REJECTED;

  await offer.save();

  return offer;
};
