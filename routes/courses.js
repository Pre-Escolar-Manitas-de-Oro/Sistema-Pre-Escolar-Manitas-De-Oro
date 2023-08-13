const express = require("express");
const path = require("path");

const router = express.Router();


const coursesController = require('../controllers/CoursesController');
const Course = require("../models/Families");
const isAuth = require("../middlewares/is-auth");

router.get("/course", isAuth, coursesController.GetCourse);
router.get("/save-course", isAuth, coursesController.GetSaveCourse);
router.post("/save-course", isAuth, coursesController.PostSaveCourse);
router.get("/edit-course/:coursesId", isAuth, coursesController.getEditCourse);
router.post("/edit-course", isAuth, coursesController.postEditCourse);

module.exports = router;