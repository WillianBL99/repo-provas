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
      Discipline: {
        include: {
          TeacherDicipline: {
            include: {
              Test: {
                include: {
                  category: {},
                },
              },
              teacher: {},
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
      Test: {
        include: {
          category: {},
        },
      },
      discipline: {
        include: {
          TeacherDicipline: {
            include: {
              Test: {},
            },
          },
        },
      },
      teacher: {},
    },
  });
}
