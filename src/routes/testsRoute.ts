import { Router } from "express";
import { createTest } from "../controllers/testController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testsSchema.js";

const testRoute = Router();

testRoute.post("/test", validateSchema(testSchema), createTest);

export default testRoute;
