import categoryModel from "../models/categoryModel.js";

async function getCategoryDetails(req, res, next) {
    try {
        const categoryId = req.params.id;

        const category =
            await categoryModel.getCategoryById(categoryId);

        const projects =
            await categoryModel.getProjectsByCategoryId(categoryId);

        res.render("category-details", {
            title: category.category_name,
            category,
            projects
        });

    } catch (error) {
        next(error);
    }
}

export default {
    getCategoryDetails
};