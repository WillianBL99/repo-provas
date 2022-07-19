import "../config/setup.js";
const ENV = process.env;

const JWT_SECRET = ENV.JWT_SECRET ?? "";
const JWT_EXPIRES_IN = ENV.JWT_EXPIRES_IN ?? "";
const JWT_ALGORITHM = "HS256";

export const env = {
  JWT_ALGORITHM,
  JWT_EXPIRES_IN,
  JWT_SECRET,
};
