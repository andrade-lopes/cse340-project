import categoryModel from '../models/categoryModel.js';

export const showCategories = async (req, res) => {
    try {
        const categories = await categoryModel.getAllCategories();
        res.render('categories', { title: 'Categories', categories });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export const getCategoryDetails = async (req, res, next) => {
    try {
        const category = await categoryModel.getCategoryById(req.params.id);
        if (!category) return res.status(404).send('Category not found');
        const projects = await categoryModel.getProjectsByCategoryId(req.params.id);
        res.render('category-details', { title: category.category_name, category, projects });
    } catch (error) {
        next(error);
    }
};

export const showNewCategoryForm = (req, res) => {
    res.render('new-category', { title: 'Add New Category', errors: [], category_name: '' });
};

export const processNewCategoryForm = async (req, res, next) => {
    try {
        const { category_name } = req.body;
        const errors = [];
        if (!category_name) errors.push('Category name is required.');
        if (category_name && category_name.length > 100) errors.push('Category name cannot exceed 100 characters.');
        if (category_name && category_name.length < 3) errors.push('Category name must be at least 3 characters.');
        if (errors.length > 0) {
            return res.render('new-category', { title: 'Add New Category', errors, category_name });
        }
        const category = await categoryModel.createCategory(category_name);
        req.flash('success', 'Category created!');
        res.redirect(`/category/${category.category_id}`);
    } catch (error) {
        next(error);
    }
};

export const showEditCategoryForm = async (req, res, next) => {
    try {
        const category = await categoryModel.getCategoryById(req.params.id);
        if (!category) return res.status(404).send('Category not found');
        res.render('edit-category', { title: 'Edit Category', errors: [], category });
    } catch (error) {
        next(error);
    }
};

export const processEditCategoryForm = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const { category_name } = req.body;
        const errors = [];
        if (!category_name) errors.push('Category name is required.');
        if (category_name && category_name.length > 100) errors.push('Category name cannot exceed 100 characters.');
        if (category_name && category_name.length < 3) errors.push('Category name must be at least 3 characters.');
        if (errors.length > 0) {
            return res.render('edit-category', {
                title: 'Edit Category', errors,
                category: { category_id: categoryId, category_name }
            });
        }
        await categoryModel.updateCategory(categoryId, category_name);
        req.flash('success', 'Category updated!');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
};