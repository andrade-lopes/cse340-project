import volunteerModel from '../models/volunteer-model.js';

async function addVolunteer(req, res) {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    try {
        await volunteerModel.addVolunteer(userId, projectId);
        req.flash('success', 'You have signed up to volunteer for this project!');
    } catch (error) {
        console.error('Error adding volunteer:', error);
        req.flash('error', 'Could not sign up for this project. Please try again.');
    }

    res.redirect(`/projects/${projectId}`);
}

async function removeVolunteer(req, res) {
    const projectId = req.params.projectId;
    const userId = req.session.user.user_id;

    // Check where we came from so we can redirect back properly
    const from = req.query.from || 'project';

    try {
        await volunteerModel.removeVolunteer(userId, projectId);
        req.flash('success', 'You have been removed as a volunteer from this project.');
    } catch (error) {
        console.error('Error removing volunteer:', error);
        req.flash('error', 'Could not remove you from this project. Please try again.');
    }

    if (from === 'dashboard') {
        return res.redirect('/dashboard');
    }

    res.redirect(`/projects/${projectId}`);
}

export default {
    addVolunteer,
    removeVolunteer
};