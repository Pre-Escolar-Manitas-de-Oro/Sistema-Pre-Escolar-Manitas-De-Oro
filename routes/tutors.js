const express = require("express");
const path = require("path");

const router = express.Router();


const tutorsController = require('../controllers/TutorsController');


router.get("/tutor", tutorsController.GetTutor);
router.get("/save-tutor", tutorsController.GetSaveTutor);
router.post("/save-tutor", tutorsController.PostSaveTutor);
router.get("/edit-tutor/:tutorId", tutorsController.getEditTutor);
router.post("/edit-tutor", tutorsController.postEditTutor);

module.exports = router;