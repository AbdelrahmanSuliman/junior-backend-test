import jwt from "jsonwebtoken";
import config from "../config/config";
import logger from "../util/logger";
import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "../types/jwt.types";

// make sure express Request class knows about our custom role-based payload
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const createToken = (email: string, role: string) => {
  try {
    return jwt.sign(
      {
        email,
        role,
      },
      config.jwtSecret,
      { expiresIn: "1h" },
    );
  } catch (err) {
    logger.error(`Error signing JWT token: ${err}`);
  }

  throw new Error("Unable to sign JWT token");
};

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized. No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as TokenPayload;

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      logger.info(req.user.role)
      return res.status(403).json({
        message: "You need to be an admin to access this route",
      });
    }
    next();
  };
};
