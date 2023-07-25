const express = require("express");
const path = require("path");

const router = express.Router();

const studentController = require("../controllers/studentController");


router.get("/", studentController.GetIndex);
router.get("/admin-student", studentController.GetAdminStudent);
router.get("/save-student", studentController.GetSaveStudent);
router.post("/save-student", studentController.PostSaveStudent);
router.get("/edit-student/:studentId", studentController.getEditStudent);
router.post("/edit-student", studentController.postEditStudent);


module.exports = router;