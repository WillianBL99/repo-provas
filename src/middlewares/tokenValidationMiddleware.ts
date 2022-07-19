import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { EMPTY_TOKEN, INVALID_TOKEN } from "../events/ErrosList.js";
import { env } from "../utils/env.js";

export async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { path } = req;
  if (path === "/favicon.ico") {
    next();
  }
  const authorization = req.header("Authorization") ?? "";
  const token = parseToken(authorization);
  let userId = null;

  try {
    const { id } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    userId = id;
  } catch (error: any) {
    console.log(error);
    throw INVALID_TOKEN;
  }

  res.locals.userId = userId;
  next();
}

function parseToken(header: string) {
  if (!header.includes("Bearer")) {
    throw EMPTY_TOKEN;
  }
  return header.replace("Bearer ", "").trim();
}
