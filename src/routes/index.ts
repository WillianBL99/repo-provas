import { Router } from "express";
import authRoute from "./authRoute.js";
import testRoute from "./testsRoute.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();
router.use(authRoute);

router.use(tokenValidation);
router.use(testRoute);

export default router;
