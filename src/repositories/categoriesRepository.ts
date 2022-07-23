import { prisma } from "../config/database.js";

export async function findById(id: number) {
  return await prisma.category.findUnique({ where: { id } });
}

export async function findByName(name: string) {
  return await prisma.category.findUnique({ where: { name } });
}

export async function find() {
  return await prisma.category.findMany();
}
