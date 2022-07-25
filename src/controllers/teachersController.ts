import { Request, Response } from "express";
import { BAD_QUERY_REQUEST } from "../events/ErrosList.js";
import teachersServer from "../services/teachersServer.js";

export async function getTeachers(req: Request, res: Response) {
  const { disciplineName } = req.query as { disciplineName: string };
  if (!disciplineName) {
    throw BAD_QUERY_REQUEST;
  }
  const teachers = await teachersServer.getTeachersByDiscipline(disciplineName);

  res.status(200).send({ teachers });
}
