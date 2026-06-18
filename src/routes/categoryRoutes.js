import express from 'express';
import {
    showCategories,
    getCategoryDetails,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/categories', showCategories);
router.get('/category/:id', getCategoryDetails);
router.get('/new-category', showNewCategoryForm);
router.post('/new-category', processNewCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', processEditCategoryForm);

export default router;