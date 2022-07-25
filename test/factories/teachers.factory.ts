import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database";

async function getTeachers(token: string) {
  const header = `Bearer ${token}`;
  return await supertest(app).get(`/teachers`).set("Authorization", header);
}

async function getTeachersByDisciplineName(
  token: string,
  disciplineName: string
) {
  const header = `Bearer ${token}`;
  return await supertest(app)
    .get(`/teachers?disciplineName=${disciplineName}`)
    .set("Authorization", header);
}

async function deleteTeacgetTeachers() {
  await prisma.$executeRaw`DELETE FROM teachers`;
}

const teachersFactory = {
  getTeachers,
  getTeachersByDisciplineName,
  deleteTeacgetTeachers,
};

export default teachersFactory;
