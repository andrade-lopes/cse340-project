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

async function getProjectDetails(req, res) {
    try {

        const projectId = req.params.projectId;

        const project =
            await projectModel.getProjectById(projectId);

        res.render("project-details", {
            title: project.project_name,
            project
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}

export default {
    getProjects,
    getProjectDetails
};