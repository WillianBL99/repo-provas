import { Request, Response } from "express";
import categoriesServer from "../services/categoriesServer.js";

export async function getCategories(_req: Request, res: Response) {
  const categories = await categoriesServer.getCategories();

  res.status(200).send({ categories });
}
