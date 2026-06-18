import volunteerModel from '../models/volunteer-model.js';

async function showDashboard(req, res) {
    try {
        const userId = req.session.user.user_id;

        const volunteeredProjects =
            await volunteerModel.getUserProjects(userId);

        res.render('dashboard', {
            title: 'My Dashboard',
            user: req.session.user,
            volunteeredProjects
        });

    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Server error');
    }
}

export default {
    showDashboard
};