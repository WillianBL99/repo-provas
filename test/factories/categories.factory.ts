import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database";

async function getCategories(token: string) {
  const header = `Bearer ${token}`;
  return await supertest(app).get(`/categories`).set("Authorization", header);
}

async function deleteCategories() {
  await prisma.$executeRaw`DELETE FROM categories`;
}

const categoriesFactory = {
  getCategories,
  deleteCategories,
};
export default categoriesFactory;
