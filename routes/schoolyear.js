const express = require("express");
const path = require("path");

const router = express.Router();


const schoolyearController = require('../controllers/SchoolYearController');


router.get("/schoolyear", schoolyearController.GetSchoolYear);
router.get("/save-schoolyear", schoolyearController.GetSaveSchoolYear);
router.post("/save-schoolyear", schoolyearController.PostSaveSchoolyear);
router.get("/edit-schoolyear/:schoolyearId", schoolyearController.getEditSchoolyear);
router.post("/edit-schoolyear", schoolyearController.postEditSchoolyear);

module.exports = router;