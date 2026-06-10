import express from 'express';
import {
    showUserRegistrationForm,
    processUserRegistrationForm
} from './controllers/users.js';

const router = express.Router();

// Register routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

export default router;