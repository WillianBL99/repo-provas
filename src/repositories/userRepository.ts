import { User } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateUserData = Omit<User, "id">;

export async function create({ email, password }: CreateUserData) {
  return await prisma.user.create({ data: { email, password } });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
