import { Router } from "express";
import { addProductController, getAllProductsController } from "../controllers/product.controllers"
import { authorizeRole } from "../middleware/jwt.middleware";

const router = Router();

router.post("/", authorizeRole("admin"), addProductController);
router.get("/", getAllProductsController)

export default router;
