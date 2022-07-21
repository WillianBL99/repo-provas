import { PrismaClient } from "@prisma/client";
import seeds from "./seeds/entities.seed.js";
const prisma = new PrismaClient();

async function main() {
  await seeds.users();
  await seeds.terms();
  await seeds.categories();
  await seeds.teachers();
  await seeds.disciplines();
  await seeds.teachersDisciplines();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
