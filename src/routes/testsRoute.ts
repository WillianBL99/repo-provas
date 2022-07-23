import { Router } from "express";
import { createTest, getTests } from "../controllers/testController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { testSchema } from "../schemas/testsSchema.js";

const testRoute = Router();

testRoute.post("/tests", validateSchema(testSchema), createTest);
testRoute.get("/tests", getTests);

export default testRoute;
