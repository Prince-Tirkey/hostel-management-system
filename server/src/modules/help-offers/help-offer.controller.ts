import type { Response, NextFunction } from "express";

import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { z } from "zod";
import {
  createHelpOffer,
  getOffersForRequest,
  acceptHelpOffer,
  rejectHelpOffer,
} from "./help-offer.service.js";

import { createHelpOfferSchema } from "./help-offer.validation.js";
import { AppError } from "../../utils/appError.js";

export const createHelpOfferController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const result = createHelpOfferSchema.safeParse(req.body);

    if (!result.success) {
      const validationError = new AppError("Validation failed", 400, "VALIDATION_ERROR");

      (validationError as any).data = z.flattenError(result.error);

      return next(validationError);
    }

    const offer = await createHelpOffer({
      requestId: req.params.requestId as string,
      helperId: req.user.userId,
      message: result.data.message,
    });

    return res.status(201).json({
      success: true,
      message: "Help offer sent successfully",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};

export const getOffersForRequestController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const offers = await getOffersForRequest(req.params.requestId as string, req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Help offers fetched successfully",
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};

export const acceptHelpOfferController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401, "UNAUTORIZED");
    }

    const result = await acceptHelpOffer(
      req.params.requestId as string,
      req.params.offerId as string,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Help offer accepted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectHelpOfferController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401, "UNAUTORIZED");
    }

    const offer = await rejectHelpOffer(
      req.params.requestId as string,
      req.params.offerId as string,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      message: "Help offer rejected",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};
