import { Router } from "express";
import { getDisciplines } from "../controllers/disciplinesController.js";

const disciplinesRoute = Router();

disciplinesRoute.get("/disciplines", getDisciplines);

export default disciplinesRoute;
