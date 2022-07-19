import { User } from "@prisma/client";
import Joi from "joi";
export type RegisterSchema = Omit<User, "id"> & {comfirmPassword: string};

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export const registerSchema = Joi.object<RegisterSchema>({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  comfirmPassword: Joi.string().min(4).required().valid(Joi.ref("password")),
});
