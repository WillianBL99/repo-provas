import { prisma } from "../config/database.js";

export async function findById(id: number) {
  return await prisma.discipline.findUnique({ where: { id } });
}

export async function findAllByCategory(category: string) {
  return await prisma.discipline.findMany({
    where: {
      teacherDisciplines: {
        some: {
          tests: {
            some: {
              category: {
                name: category,
              },
            },
          },
        },
      },
    },
  });
}

export async function findByName(name: string) {
  return await prisma.discipline.findUnique({ where: { name } });
}
