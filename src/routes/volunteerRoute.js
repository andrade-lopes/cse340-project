import express from 'express';
import volunteerController from '../controllers/volunteerController.js';
import { checkLogin } from '../middleware.js';

const router = express.Router();

router.get('/volunteer/add/:projectId', checkLogin, volunteerController.addVolunteer);
router.get('/volunteer/remove/:projectId', checkLogin, volunteerController.removeVolunteer);

export default router;