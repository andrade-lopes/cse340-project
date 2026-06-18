import express from 'express';
import {
    showNewOrganizationForm,
    processNewOrganizationForm,
    showOrganizations,
    showOrganizationDetails
} from '../controllers/organizationController.js';

const router = express.Router();

router.get('/organizations', showOrganizations);
router.get('/organization/:id', showOrganizationDetails);
router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', processNewOrganizationForm);

export default router;