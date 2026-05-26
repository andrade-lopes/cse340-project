import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express.Router();

router.get(
    "/category/:id",
    categoryController.getCategoryDetails
);

export default router;