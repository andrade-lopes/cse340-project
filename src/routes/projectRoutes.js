import express from 'express';
import projectController from '../controllers/projectController.js';

const router = express.Router();

router.get('/projects', projectController.getProjects);
router.get('/projects/:projectId', projectController.getProjectDetails);

export default router;