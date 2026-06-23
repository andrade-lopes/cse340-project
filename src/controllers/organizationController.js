import organizationsModel from '../models/organizations.js';

export const showNewOrganizationForm = async (req, res) => {
    res.render('new-organization', { title: 'Add New Organization' });
};

export const processNewOrganizationForm = async (req, res) => {
    const { name, description, contactEmail } = req.body;
    try {
        const organizationId = await organizationsModel.createOrganization(
            name, description, contactEmail, 'placeholder-logo.png'
        );
        req.flash('success', 'Organization created successfully!');
        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        console.error('Error creating organization:', error);
        req.flash('error', 'Could not create organization. Please try again.');
        res.redirect('/new-organization');
    }
};

export const showOrganizations = async (req, res) => {
    try {
        const organizations = await organizationsModel.getAllOrganizations();
        res.render('organizations', { title: 'Organizations', organizations });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export const showOrganizationDetails = async (req, res) => {
    try {
        const org = await organizationsModel.getOrganizationById(req.params.id);
        if (!org) return res.status(404).send('Organization not found');
        res.render('organization-details', { title: org.name, organization: org });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};