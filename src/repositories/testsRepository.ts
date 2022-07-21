import { Test } from "@prisma/client";
import { prisma } from "../config/database.js";
export type CreateTestData = Omit<Test, "id">;
export async function create(creatTestData: CreateTestData) {
  await prisma.test.create({ data: creatTestData });
}
