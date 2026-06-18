import projectModel from '../models/projectModel.js';
import volunteerModel from '../models/volunteer-model.js';

const getProjects = async (req, res) => {
    try {
        const projects = await projectModel.getAllProjects();
        res.render('projects', { title: 'Service Projects', projects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const getProjectDetails = async (req, res) => {
    try {
        const project = await projectModel.getProjectById(req.params.projectId);
        if (!project) return res.status(404).send('Project not found');

        let isVolunteer = false;
        if (req.session?.user) {
            isVolunteer = await volunteerModel.isVolunteer(
                req.session.user.user_id,
                req.params.projectId
            );
        }

        res.render('project-details', {
            title: project.project_name,
            project,
            isVolunteer
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

export default { getProjects, getProjectDetails };