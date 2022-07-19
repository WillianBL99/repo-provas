import jwt, { Algorithm, SignOptions } from "jsonwebtoken";
import { ALREADY_REGISTERED, UNAUTHORIZED } from "../events/ErrosList.js";
import * as userRepository from "../repositories/userRepository.js";
import { CreateUserData } from "../repositories/userRepository.js";
import { Bcrypt } from "../utils/encrypt.js";
import { env } from "../utils/env.js";

async function register(registerData: CreateUserData) {
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
    throw UNAUTHORIZED;
  }

  const descriptPass = Bcrypt.compareSync(password, user.password);
  if (!descriptPass) {
    throw UNAUTHORIZED;
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
