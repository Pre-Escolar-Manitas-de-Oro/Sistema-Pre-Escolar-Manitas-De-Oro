const express = require("express");
const path = require("path");

const router = express.Router();

const studentController = require("../controllers/StudentController");
const Student = require("../models/Students");

router.get("/", studentController.GetIndex);
router.get("/admin-student", studentController.GetAdminStudent);
router.get("/save-student", studentController.GetSaveStudent);
router.post("/save-student", studentController.PostSaveStudent);


module.exports = router;