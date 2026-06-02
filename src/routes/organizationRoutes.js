const express = require('express');
const router = express.Router();

// Import controller
const { showNewOrganizationForm } = require('../controllers/organizationController');

// Route: show "Add New Organization" form
router.get('/new-organization', showNewOrganizationForm);

module.exports = router;