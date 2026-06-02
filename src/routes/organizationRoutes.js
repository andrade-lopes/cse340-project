import express from "express";
import { showNewOrganizationForm } from "../controllers/organizationController.js";

const router = express.Router();

router.get("/new-organization", showNewOrganizationForm);

export default router;