import "reflect-metadata";
import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import helmet from "helmet";
import ExceptionHandler from "./events/AppError.js";
import router from "./routes/index.js";
import { connectDb, disconnectDb } from "./config/database.js";
import { loadEnv } from "./config/envs.js";

loadEnv();

const app = express();
app.use(cors());
app.use(json());
app.use(helmet());
app.use(router);
app.use(ExceptionHandler);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;
