import express from "express";
import {
    showNewOrganizationForm,
    processNewOrganizationForm
} from "../controllers/organizationController.js";

const router = express.Router();

// Display form
router.get("/new-organization", showNewOrganizationForm);

// Handle form submission
router.post("/new-organization", processNewOrganizationForm);

export default router;