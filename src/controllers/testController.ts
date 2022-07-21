import { Request, Response } from "express";
import testsServer from "../services/testsServer.js";

export async function createTest(req: Request, res: Response) {
  const userData = req.body;
  await testsServer.create(userData);
  res.sendStatus(201);
}
