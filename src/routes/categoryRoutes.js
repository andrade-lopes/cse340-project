import express from "express";

import {
    getCategoryDetails,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from "../controllers/categoryController.js";

const router = express.Router();

// View category details
router.get(
    "/category/",
    getCategoryDetails
);

// Display new category form
router.get(
    "/new-category",
    showNewCategoryForm
);

// Process new category form
router.post(
    "/new-category",
    processNewCategoryForm
);

// Display edit category form
router.get(
    "/edit-category/",
    showEditCategoryForm
);

// Process edit category form
router.post(
    "/edit-category/",
    processEditCategoryForm
);

export default router;