import { Request, Response } from "express";
import { BAD_QUERY_REQUEST } from "../events/ErrosList.js";
import disciplinesServer from "../services/disciplinesServer.js";

export async function getDisciplines(req: Request, res: Response) {
  const { categoryName } = req.query as { categoryName: string };
  if (!categoryName) {
    throw BAD_QUERY_REQUEST;
  }
  const disciplines = await disciplinesServer.getDisciplinesByCategoryName(
    categoryName
  );

  res.status(200).send({ disciplines });
}
