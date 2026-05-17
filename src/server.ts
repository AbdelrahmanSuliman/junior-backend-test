import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";
import config from "./config/config";
import authRouter from "./routes/auth.routes"
import productRouter from "./routes/product.routes"
import { Request, Response, NextFunction } from "express";
import { authenticateToken, authorizeRole } from "./middleware/jwt.middleware";
import { errorHandler } from "./middleware/error-handler.middleware";


const app = express();
app.use(express.json());

mongoose
  .connect(config.databaseUrl as string)
  .then(() => logger.info("MongoDB connection established"))
  .catch((err) => logger.error(`MongoDB connection error: ${err}`));

app.listen(3000, () => console.log("Server running on port 3000"));

app.use("/api/auth", authRouter)
app.use("/api/products", authenticateToken, productRouter)

app.use(errorHandler)

