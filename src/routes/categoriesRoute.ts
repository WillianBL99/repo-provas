import { Router } from "express";
import { getCategories } from "../controllers/categoriesController.js";

const categoriesRoute = Router();

categoriesRoute.get("/categories", getCategories);

export default categoriesRoute;
