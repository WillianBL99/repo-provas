import { PrismaClient } from "@prisma/client";
import { Bcrypt } from "../../src/utils/encrypt.js";
const prisma = new PrismaClient();

async function users() {
  console.log("insert users");

  const users = [
    { email: "joanna@gmail.com", password: "1234" },
    { email: "uilian@gmail.com", password: "1234" },
  ];

  for (let i = 0; i < users.length; i++) {
    const userData = users[i];
    userData.password = Bcrypt.hashValue(userData.password);

    const user = await prisma.user.upsert({
      where: { id: i + 1 },
      update: userData,
      create: userData,
    });
    console.log(user);
  }
}

async function terms() {
  console.log("insert terms");
  for (let i = 0; i <= 6; i++) {
    const term = await prisma.term.upsert({
      where: { id: i + 1 },
      update: { number: i + 1 },
      create: { number: i + 1 },
    });
    console.log(term);
  }
}

async function categories() {
  console.log("insert categories");

  let names = [
    { name: "Projeto" },
    { name: "Pratica" },
    { name: "Recuperação" },
  ];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const category = await prisma.category.upsert({
      where: { id: i + 1 },
      update: name,
      create: name,
    });
    console.log(category);
  }
}

async function teachers() {
  console.log("insert teachers");
  const names = [
    { name: "Diego Pinho" },
    { name: "Bruna Hamori" },
    { name: "Paulo Uilian" },
  ];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const teacher = await prisma.teacher.upsert({
      where: { id: i + 1 },
      update: name,
      create: name,
    });
    console.log(teacher);
  }
}

async function disciplines() {
  console.log("insert disciplines");
  const names = [
    { name: "HTML e CSS", termId: 1 },
    { name: "JavaScript", termId: 2 },
    { name: "Humildade", termId: 1 },
    { name: "Planejamento", termId: 2 },
    { name: "Autoconfiança", termId: 3 },
  ];

  for (let i = 0; i < names.length; i++) {
    const disciplineData = names[i];
    const teacher = await prisma.discipline.upsert({
      where: { id: i + 1 },
      update: disciplineData,
      create: disciplineData,
    });
    console.log(teacher);
  }
}

async function teachersDisciplines() {
  console.log("insert teachersDisciplines");
  const names = [
    { teacherId: 1, disciplineId: 1 },
    { teacherId: 1, disciplineId: 2 },
    { teacherId: 1, disciplineId: 3 },
    { teacherId: 2, disciplineId: 4 },
    { teacherId: 2, disciplineId: 5 },
  ];

  for (let i = 0; i < names.length; i++) {
    const relationData = names[i];
    const teacherDiscipline = await prisma.teacherDicipline.upsert({
      where: { id: i + 1 },
      update: relationData,
      create: relationData,
    });
    console.log(teacherDiscipline);
  }
}

export default {
  users,
  terms,
  categories,
  teachers,
  disciplines,
  teachersDisciplines,
};
