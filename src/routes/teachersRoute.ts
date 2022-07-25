import { Router } from "express";
import { getTeachers } from "../controllers/teachersController.js";

const teachersRoute = Router();

teachersRoute.get("/teachers", getTeachers);

export default teachersRoute;
