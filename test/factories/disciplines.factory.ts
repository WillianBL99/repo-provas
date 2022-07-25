import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database";

async function getDisciplines(token: string) {
  const header = `Bearer ${token}`;
  return await supertest(app).get(`/disciplines`).set("Authorization", header);
}

async function getDisciplinesByCategoryName(
  token: string,
  categoryName: string
) {
  const header = `Bearer ${token}`;
  return await supertest(app)
    .get(`/disciplines?categoryName=${categoryName}`)
    .set("Authorization", header);
}

async function deleteDisciplines() {
  await prisma.$executeRaw`DELETE FROM disciplines`;
}

const disciplinesFactory = {
  getDisciplines,
  getDisciplinesByCategoryName,
  deleteDisciplines,
};

export default disciplinesFactory;
