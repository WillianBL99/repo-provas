import { prisma } from "../config/database.js";

export type RelationData = {
  disciplineId: number;
  teacherId: number;
};

export async function findById(id: number) {
  return await prisma.teacherDicipline.findUnique({ where: { id } });
}

export async function findByName(name: string) {
  return await prisma.teacher.findUnique({ where: { name } });
}

export async function findAllByDiscipline(discipline: string) {
  return await prisma.teacher.findMany({
    where: {
      teacherDisciplines: {
        some: {
          discipline: {
            name: discipline,
          },
        },
      },
    },
  });
}

export async function findRelationshipTeachDiscipline(
  relationData: RelationData
) {
  return await prisma.teacherDicipline.findFirst({
    where: relationData,
  });
}

export async function createRelationshipTeachDiscipline(
  relationData: RelationData
) {
  return await prisma.teacherDicipline.create({ data: relationData });
}
