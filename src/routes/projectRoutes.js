import express from "express";
import projectController from "../controllers/projectController.js";

const router = express.Router();

router.get(
    "/projects",
    projectController.getProjects
);

export default router;