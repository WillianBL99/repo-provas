import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

const authRoute = Router();

authRoute.post("/sign-up", validateSchema(registerSchema), register);
authRoute.post("/sign-in", validateSchema(loginSchema), login);

export default authRoute;
