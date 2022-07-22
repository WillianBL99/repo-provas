import { Test } from "@prisma/client";
import Joi from "joi";
export type TestSchema = Pick<Test, "pdfUrl" | "name"> & {
  category: string;
  discipline: string;
  teacherName: string;
};

export const testSchema = Joi.object<TestSchema>({
  name: Joi.string().required(),
  pdfUrl: Joi.string().uri().required(),
  category: Joi.string().required(),
  discipline: Joi.string().required(),
  teacherName: Joi.string().required(),
});
