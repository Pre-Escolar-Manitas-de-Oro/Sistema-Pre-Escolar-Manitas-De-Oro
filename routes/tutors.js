const express = require("express");
const path = require("path");

const router = express.Router();


const tutorsController = require('../controllers/TutorsController');
const Tutors = require("../models/Families");

router.get("/tutor", tutorsController.GetTutor);
router.get("/save-tutor", tutorsController.GetSaveTutor);
router.post("/save-course", tutorsController.PostSaveTutor);


module.exports = router;