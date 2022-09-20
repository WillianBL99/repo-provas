import bcrypt, { compareSync } from "bcrypt";

export const Bcrypt = {
  hashValue,
  compareSync,
};

function hashValue(value: string) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedValue = bcrypt.hashSync(value, salt);

  return hashedValue;
}
