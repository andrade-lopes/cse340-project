const volunteerModel =
    require("../models/volunteer-model");

async function addVolunteer(req, res) {

    const projectId = req.params.projectId;

    const userId = res.locals.accountData.user_id;

    await volunteerModel.addVolunteer(
        userId,
        projectId
    );

    res.redirect(`/projects/${projectId}`);
}

async function removeVolunteer(req, res) {

    const projectId = req.params.projectId;

    const userId = res.locals.accountData.user_id;

    await volunteerModel.removeVolunteer(
        userId,
        projectId
    );

    res.redirect(`/projects/${projectId}`);
}

module.exports = {
    addVolunteer,
    removeVolunteer,
};