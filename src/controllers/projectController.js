import projectModel from '../models/projectModel.js';
import volunteerModel from '../models/volunteer-model.js';

async function getProjects(req, res) {
    try {
        const projects = await projectModel.getAllProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

async function getProjectDetails(req, res) {
    try {
        const projectId = req.params.projectId;

        const project = await projectModel.getProjectById(projectId);

        if (!project) {
            return res.status(404).send('Project not found');
        }

        let isVolunteer = false;

        if (req.session && req.session.user) {
            isVolunteer = await volunteerModel.isVolunteer(
                req.session.user.user_id,
                projectId
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
}

export default {
    getProjects,
    getProjectDetails
};