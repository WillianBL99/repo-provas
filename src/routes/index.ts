import { Router } from "express";
import authRoute from "./authRoute.js";
import testRoute from "./testsRoute.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import categoriesRoute from "./categoriesRoute.js";
import disciplinesRoute from "./disciplinesRoute.js";
import teachersRoute from "./teachersRoute.js";

const router = Router();
router.use(authRoute);

router.use(tokenValidation);
router.use(testRoute);
router.use(categoriesRoute);
router.use(disciplinesRoute);
router.use(teachersRoute);

export default router;
