import { body, validationResult } from "express-validator";
import { Router, Request, Response, NextFunction } from "express";

export const productValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
