import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database";

export type Test = {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacherName: string;
};

export type FakerTestData = Partial<Test>;

async function countTests() {
  return await prisma.test.count();
}

function createTestData({ category, discipline, teacherName }: FakerTestData) {
  return {
    name: faker.name.findName(),
    pdfUrl: faker.internet.url(),
    category: category || "Projeto",
    discipline: discipline || "JavaScript",
    teacherName: teacherName || "Bruna Hamori",
  };
}

async function postTest(test: Test, token: string) {
  const header = `Bearer ${token}`;
  return await supertest(app)
    .post("/tests")
    .send(test)
    .set("Authorization", header);
}

async function postTestWhitIncorrectBody(token: string) {
  const header = `Bearer ${token}`;
  return await supertest(app)
    .post("/tests")
    .send({ abcd: 1234 })
    .set("Authorization", header);
}

async function getTestsGroupBy(groupBy: string, token: string) {
  const header = `Bearer ${token}`;
  return await supertest(app)
    .get(`/tests`)
    .query({ groupBy })
    .set("Authorization", header);
}

async function deleteTests() {
  await prisma.$executeRaw`DELETE FROM tests`;
}

const testFactory = {
  createTestData,
  postTest,
  postTestWhitIncorrectBody,
  countTests,
  deleteTests,
  getTestsGroupBy,
};
export default testFactory;
