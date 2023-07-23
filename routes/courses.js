const express = require("express");
const path = require("path");

const router = express.Router();


const coursesController = require('../controllers/CoursesController');
const Course = require("../models/Families");

router.get("/course", coursesController.GetCourse);
router.get("/save-course", coursesController.GetSaveCourse);
router.post("/save-course", coursesController.PostSaveCourse);
router.get("/edit-course/:coursesId", coursesController.getEditCourse);
router.post("/edit-course", coursesController.postEditCourse);

module.exports = router;