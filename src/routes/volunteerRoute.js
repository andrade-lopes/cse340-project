import express from 'express';
import volunteerController from '../controllers/volunteerController.js';
import { checkLogin } from '../middleware.js';

const router = express.Router();

// Add a volunteer signup
router.get(
    '/volunteer/add/:projectId',
    checkLogin,
    volunteerController.addVolunteer
);

// Remove a volunteer signup
router.get(
    '/volunteer/remove/:projectId',
    checkLogin,
    volunteerController.removeVolunteer
);

export default router;