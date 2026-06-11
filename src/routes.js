import express from 'express';
import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout
} from './controllers/users.js';

const router = express.Router();

// Register routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// Login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

export default router;