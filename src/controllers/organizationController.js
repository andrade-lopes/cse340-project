import organizationsModel from "../models/organizations.js";

export const showNewOrganizationForm = async (req, res) => {
    const title = "Add New Organization";
    res.render("new-organization", { title });
};

export const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;

    const logoFilename = "placeholder-logo.png";

    const organizationId =
        await organizationsModel.createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

    res.redirect(`/organization/${organizationId}`);
};