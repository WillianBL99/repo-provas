import { NextFunction, Request, Response } from "express";
import AppError from "../config/error.js";
import AppLog from "./AppLog.js";

function ExceptionHandler(
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { log, statusCode, message, detail } = error;

  AppLog("Error", log || error);
  return error instanceof AppError
    ? res.status(statusCode).send({ message, detail })
    : res.status(500).send({
        message: "Internal server error",
      });
}

export { AppError };
export default ExceptionHandler;
