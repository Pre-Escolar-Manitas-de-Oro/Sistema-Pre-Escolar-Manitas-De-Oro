const express = require("express");
const path = require("path");

const router = express.Router();


const schoolyearController = require('../controllers/SchoolYearController');
const isAuth = require("../middlewares/is-auth");

router.get("/schoolyear", isAuth, schoolyearController.GetSchoolYear);
router.get("/save-schoolyear", isAuth, schoolyearController.GetSaveSchoolYear);
router.post("/save-schoolyear", isAuth, schoolyearController.PostSaveSchoolyear);
router.get("/edit-schoolyear/:schoolyearId", isAuth, schoolyearController.getEditSchoolyear);
router.post("/edit-schoolyear", isAuth, schoolyearController.postEditSchoolyear);

module.exports = router;