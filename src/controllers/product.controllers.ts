import {
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} from "./../services/product.services";
import { Request, Response, NextFunction } from "express";
import { addProductService } from "../services/product.services";

export const addProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = req.body;
    await addProductService(product);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(404).json({
        message: "Product does not exist",
      });
    }
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

export const updateProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const productDetails = req.body;
    await updateProductByIdService(id, productDetails);
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const product = await deleteProductByIdService(id);
    if (!product) {
      return res.status(404).json({
        message: "Product does not exist",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (err) {
    next(err);
  }
};
