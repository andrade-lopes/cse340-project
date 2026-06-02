import categoryModel from "../models/categoryModel.js";

async function getProjects(req, res) {
    try {

        const categories =
            await categoryModel.getCategoriesByProjectId(null);

        res.render("projects", {
            title: "Projects",
            categories
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    getProjects
};