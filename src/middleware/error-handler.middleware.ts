import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
