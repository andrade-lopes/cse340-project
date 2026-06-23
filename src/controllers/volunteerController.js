import volunteerModel from '../models/volunteer-model.js';

const addVolunteer = async (req, res) => {
    const { projectId } = req.params;
    try {
        await volunteerModel.addVolunteer(req.session.user.user_id, projectId);
        req.flash('success', 'You have signed up to volunteer for this project!');
    } catch (error) {
        console.error('Error adding volunteer:', error);
        req.flash('error', 'Could not sign up. Please try again.');
    }
    res.redirect(`/projects/${projectId}`);
};

const removeVolunteer = async (req, res) => {
    const { projectId } = req.params;
    const from = req.query.from || 'project';
    try {
        await volunteerModel.removeVolunteer(req.session.user.user_id, projectId);
        req.flash('success', 'You have been removed as a volunteer.');
    } catch (error) {
        console.error('Error removing volunteer:', error);
        req.flash('error', 'Could not remove you. Please try again.');
    }
    res.redirect(from === 'dashboard' ? '/dashboard' : `/projects/${projectId}`);
};

export default { addVolunteer, removeVolunteer };