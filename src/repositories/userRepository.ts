import { User } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateUserData = Omit<User, "id">;

export async function create(createUserData: CreateUserData) {
  return await prisma.user.create({ data: createUserData });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
