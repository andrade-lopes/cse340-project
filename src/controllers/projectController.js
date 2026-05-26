async function getProjects(req, res) {

    res.render("projects", {
        title: "Projects"
    });

}

export default {
    getProjects
};