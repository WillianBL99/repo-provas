import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app";
import { prisma } from "../../src/config/database";

export type Register = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type Login = Omit<Register, "confirmPassword">;

function createUserRegister(
  email = faker.internet.email(),
  password = faker.internet.password(10)
) {
  return { email, password, confirmPassword: password };
}

async function findUser(email: string) {
  return await prisma.user.findFirst({ where: { email } });
}

async function registerUser(register: Register) {
  return await supertest(app).post("/sign-up").send(register);
}

async function registerUserWithIncorrectBody() {
  return await supertest(app).post("/sign-up").send({ em: 1234 });
}

async function loginUser({ email, password }: Login) {
  return await supertest(app).post("/sign-in").send({ email, password });
}

async function loginUserWithIncorrectBody() {
  return await supertest(app).post("/sign-up").send({ em: 1234 });
}

async function completLogin() {
  const register = createUserRegister();
  await registerUser(register);
  const { body } = await loginUser(register);
  return body.token;
}

async function deleteUsers() {
  await prisma.$executeRaw`DELETE FROM users`;
}

const userFactory = {
  completLogin,
  createUserRegister,
  findUser,
  registerUser,
  registerUserWithIncorrectBody,
  loginUser,
  loginUserWithIncorrectBody,
  deleteUsers,
};

export default userFactory;
