const express = require("express");
const path = require("path");

const router = express.Router();


const familiesController = require('../controllers/FamiliesController');
const Families = require("../models/Courses");

router.get("/family", familiesController.GetFamily);
router.get("/save-family", familiesController.GetSaveFamily);
router.post("/save-family", familiesController.PostSaveFamily);


module.exports = router;