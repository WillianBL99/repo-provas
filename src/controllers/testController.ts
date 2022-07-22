import { Request, Response } from "express";
import testsServer, { GroupBy } from "../services/testsServer.js";

export async function createTest(req: Request, res: Response) {
  const userData = req.body;
  await testsServer.create(userData);
  res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
  const groupBy = req.query as GroupBy;
  const tests = await testsServer.getTests(groupBy);
  res.status(200).send(tests);
}
