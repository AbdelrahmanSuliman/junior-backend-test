import express from "express";
import mongoose from "mongoose";
import logger from "./util/logger";
import config from "./config/config";

const app = express();
app.use(express.json());

mongoose
  .connect(config.databaseUrl as string)
  .then(() => logger.info("MongoDB connection established"))
  .catch((err) => logger.error(`MongoDB connection error: ${err}`));

app.listen(3000, () => console.log("Server running on port 3000"));
