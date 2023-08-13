const express = require("express");
const path = require("path");

const router = express.Router();


const tutorsController = require('../controllers/TutorsController');
const isAuth = require("../middlewares/is-auth");

router.get("/tutor", isAuth, tutorsController.GetTutor);
router.get("/save-tutor", isAuth, tutorsController.GetSaveTutor);
router.post("/save-tutor", isAuth, tutorsController.PostSaveTutor);
router.get("/edit-tutor/:tutorId", isAuth, tutorsController.getEditTutor);
router.post("/edit-tutor", isAuth, tutorsController.postEditTutor);

module.exports = router;