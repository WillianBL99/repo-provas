import { Router } from "express";
import authRoute from "./authRoute.js";
import testRoute from "./testsRoute.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import categoriesRoute from "./categoriesRoute.js";

const router = Router();
router.use(authRoute);

router.use(tokenValidation);
router.use(testRoute);
router.use(categoriesRoute);

export default router;
