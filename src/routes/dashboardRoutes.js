import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import { requireLogin } from '../middleware.js';

const router = express.Router();

router.get('/dashboard', requireLogin, dashboardController.showDashboard);

export default router;