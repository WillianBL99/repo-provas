import { Request, Response } from "express";
import { BAD_QUERY_REQUEST } from "../events/ErrosList.js";
import testsServer, { GroupBy } from "../services/testsServer.js";

export async function createTest(req: Request, res: Response) {
  const userData = req.body;
  await testsServer.create(userData);
  res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
  const { groupBy } = parseGroupByParamter(req.query.groupBy);
  const tests = await testsServer.getTests({ groupBy });
  res.status(200).send({ tests });
}

function parseGroupByParamter(groupBy: any): GroupBy {
  if (groupBy === "disciplines" || groupBy === "teachers") {
    return { groupBy };
  }
  throw BAD_QUERY_REQUEST;
}
