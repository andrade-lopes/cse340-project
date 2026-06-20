import express from 'express';
import volunteerController from '../controllers/volunteerController.js';
import { requireLogin } from '../middleware.js';

const router = express.Router();

router.get('/volunteer/add/:projectId', requireLogin, volunteerController.addVolunteer);
router.get('/volunteer/remove/:projectId', requireLogin, volunteerController.removeVolunteer);

export default router;