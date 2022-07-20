import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("insert users");
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      password: "123413",
    },
  });
  console.log({ alice });

  if (!(await prisma.term.findUnique({ where: { number: 1 } }))) {
    console.log("insert terms");
    const terms = [];
    for (let i = 1; i <= 6; i++) {
      terms.push(await prisma.term.create({ data: { number: i } }));
    }
    console.log(terms);
  }

  console.log("insert categories");
  const categories = [];
  categories.push(
    await prisma.category.upsert({
      where: { id: 1 },
      update: { name: "Projetão" },
      create: { name: "Projetão" },
    })
  );

  categories.push(
    await prisma.category.upsert({
      where: { id: 2 },
      update: { name: "Prática" },
      create: { name: "Prática" },
    })
  );

  categories.push(
    await prisma.category.upsert({
      where: { id: 3 },
      update: { name: "Recuperação" },
      create: { name: "Recuperação" },
    })
  );
  console.log(categories);

  console.log("insert teachers");
  const teachers = [];
  let name = { name: "Diego Pinho" };
  teachers.push(
    await prisma.teacher.upsert({ where: name, update: name, create: name })
  );
  name = { name: "Bruna Hamori" };
  teachers.push(
    await prisma.teacher.upsert({ where: name, update: name, create: name })
  );
  console.log(teachers);

  console.log("");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
