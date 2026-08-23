import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { AppError } from "../../utils/appError.js";

import {
  createHelpRequest,
  getHelpRequestById,
  getMyHelpRequests,
  getOpenHelpRequests,
} from "./help-request.service.js";

export const createHelpRequestController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
        throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const helpRequest = await createHelpRequest({
      requesterId: req.user.userId,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    });

    return res.status(201).json({
      success: true,
      message: "Help request created successfully",
      data: helpRequest,
    });
  } catch (error) {
    next(error);
  }
};

export const getOpenHelpRequestsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests = await getOpenHelpRequests();

    return res.status(200).json({
      success: true,
      message: "Help requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const getHelpRequestByIdController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = await getHelpRequestById(req.params.id as string);

    if (!request) {
        throw new AppError("Help request not found", 404, "REQUEST_NOT_FOUND")
    }

    return res.status(200).json({
      success: true,
      message: "Help request fetched successfully",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyHelpRequestsController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
        throw new AppError("Authentication required", 401, "UNAUTHORIZED");
    }

    const requests = await getMyHelpRequests(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Your help requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};