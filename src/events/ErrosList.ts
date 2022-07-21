import { AppError } from "./AppError.js";

export const ACCESS_DANIED = (entityName: string) => {
  return new AppError(
    `${entityName} access danied`,
    401,
    "make sure this document is yours"
  );
};

export const ALREADY_REGISTERED = new AppError(
  "Already registered",
  409,
  "Email already registered",
  "login or register another email"
);

export const DUPLICATE_LABLE = new AppError(
  "Duplicate lable",
  409,
  "Lable already exists",
  "Insert a different label"
);

export const EMPTY_TOKEN = new AppError(
  "Empty token",
  400,
  "Invalid token",
  "Make sure you send the token correctly"
);

export const INVALID_ID = new AppError(
  "Invalid Id",
  403,
  "Invalid id",
  "make sure to send a valid id"
);

export const INVALID_TOKEN = (error?: any) => {
  return new AppError("Invalid token", 403, "Invalid token", error);
};

export const NOT_FOUND = (details?: string) => {
  return new AppError("Not found", 404, "Not found", details);
};

export const UNAUTHORIZED = new AppError(
  "Sign-in unauthorized",
  401,
  "Unauthorized",
  "Email or password are incorrect"
);
