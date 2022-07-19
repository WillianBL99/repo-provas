import { Request, Response } from "express";
import authServer from "../services/authServer.js";

export async function register(req: Request, res: Response) {
  const userData = req.body;
  await authServer.register(userData);
  res.sendStatus(201);
}

export async function login(req: Request, res: Response) {
  const loginData = req.body;
  const token = authServer.login(loginData);

  res.status(200).send({ token });
}
