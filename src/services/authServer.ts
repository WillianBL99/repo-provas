import jwt, { Algorithm, SignOptions } from "jsonwebtoken";
import {
  ALREADY_REGISTERED,
  PASSWORD_OR_EMAIL_INCORRECT,
} from "../events/ErrosList.js";
import * as userRepository from "../repositories/userRepository.js";
import { CreateUserData } from "../repositories/userRepository.js";
import { RegisterSchema } from "../schemas/authSchema.js";
import { Bcrypt } from "../utils/encrypt.js";
import { env } from "../utils/env.js";

async function register(registerData: RegisterSchema) {
  const { email, password } = registerData;
  const user = await userRepository.findByEmail(email);
  if (user) {
    throw ALREADY_REGISTERED;
  }

  const hashedPass = Bcrypt.hashValue(password);
  await userRepository.create({ ...registerData, password: hashedPass });
}

async function login(loginData: CreateUserData) {
  const user = await getUserOrFail(loginData);
  const token = jwtTokenGenerate(user.id);

  return token;
}

async function getUserOrFail(loginData: CreateUserData) {
  const { email, password } = loginData;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw PASSWORD_OR_EMAIL_INCORRECT;
  }

  const descriptPass = Bcrypt.compareSync(password, user.password);
  if (!descriptPass) {
    throw PASSWORD_OR_EMAIL_INCORRECT;
  }

  return user;
}

function jwtTokenGenerate(id: number) {
  const data = { id };
  const subject = id.toString();
  const secretKey = env.JWT_SECRET;
  const expiresIn = env.JWT_EXPIRES_IN;
  const algorithm = env.JWT_ALGORITHM as Algorithm;

  const config: SignOptions = { algorithm, expiresIn, subject };
  const token = jwt.sign(data, secretKey, config);

  return token;
}

const authServer = {
  register,
  login,
};

export default authServer;
