const express = require("express");
const router = new express.Router();

const volunteerController =
    require("../controllers/volunteerController");

const utilities = require("../utilities");

router.get(
    "/add/:projectId",
    utilities.checkLogin,
    volunteerController.addVolunteer
);

router.get(
    "/remove/:projectId",
    utilities.checkLogin,
    volunteerController.removeVolunteer
);

module.exports = router;