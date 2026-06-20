import express from 'express';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    showUsersPage
} from './controllers/users.js';
import { requireLogin, requireRole } from './middleware.js';

const router = express.Router();

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

router.get('/users', requireLogin, requireRole('admin'), showUsersPage);

export default router;