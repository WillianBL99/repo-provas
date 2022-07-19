import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";

const authRoute = Router();

authRoute.post("/sign-up", validateSchema(authSchema), register);
authRoute.post("/sign-in", validateSchema(authSchema), login);

export default authRoute;
