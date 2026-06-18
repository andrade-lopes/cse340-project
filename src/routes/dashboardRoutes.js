import express from 'express';
import dashboardController from '../controllers/dashboardController.js';
import { checkLogin } from '../middleware.js';

const router = express.Router();

router.get('/dashboard', checkLogin, dashboardController.showDashboard);

export default router;