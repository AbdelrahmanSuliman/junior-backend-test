import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiry: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl:
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/backend-test",
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiry: process.env.JWT_EXPIRY as string
};

export default config;
