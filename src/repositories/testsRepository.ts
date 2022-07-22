import { Test } from "@prisma/client";
import { prisma } from "../config/database.js";
export type CreateTestData = Omit<Test, "id">;

export async function create(creatTestData: CreateTestData) {
  await prisma.test.create({ data: creatTestData });
}

export async function findGroupByDisciplinies() {
  return await prisma.term.findMany({
    orderBy: { number: "asc" },
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              tests: {
                include: {
                  category: true,
                },
              },
              teacher: true,
            },
          },
        },
      },
    },
  });
}

export async function findGroupByTeacher() {
  return await prisma.teacherDicipline.findMany({
    orderBy: { id: "desc" },
    select: {
      tests: {
        include: {
          category: true,
        },
      },
      discipline: {
        include: {
          teacherDisciplines: {
            include: {
              tests: true,
            },
          },
        },
      },
      teacher: true,
    },
  });
}
