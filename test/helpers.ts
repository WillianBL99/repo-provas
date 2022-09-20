import { prisma } from "../src/config/database";

export async function cleanDb() {
  await prisma.user.deleteMany();
  await prisma.test.deleteMany();
}
