import { Router } from "express";
import {
  addProductController,
  deleteProductByIdController,
  getAllProductsController,
  updateProductByIdController,
  getProductByIdController,
} from "../controllers/product.controllers";
import { authorizeRole } from "../middleware/jwt.middleware";
import {
  productValidationRules,
  validate,
} from "../middleware/schema-validation.middleware";
const router = Router();

router.post(
  "/",
  authorizeRole("admin"),
  productValidationRules,
  validate,
  addProductController,
);
router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);
router.put(
  "/:id",
  authorizeRole("admin"),
  productValidationRules,
  validate,
  updateProductByIdController,
);
router.delete("/:id", authorizeRole("admin"), deleteProductByIdController);

export default router;
