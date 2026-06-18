import volunteerModel from '../models/volunteer-model.js';

const showDashboard = async (req, res) => {
    try {
        const volunteeredProjects = await volunteerModel.getUserProjects(
            req.session.user.user_id
        );
        res.render('dashboard', {
            title: 'My Dashboard',
            user: req.session.user,
            volunteeredProjects
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Server error');
    }
};

export default { showDashboard };