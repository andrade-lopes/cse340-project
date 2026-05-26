import categoryModel from "../models/categoryModel.js";
const categories =
    await categoryModel.getCategoriesByProjectId(projectId);
    
async function getProjects(req, res) {

    res.render("projects", {
        title: "Projects"
    });

}

export default {
    getProjects
};