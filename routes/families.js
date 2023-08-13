const express = require("express");
const path = require("path");

const router = express.Router();


const familiesController = require('../controllers/FamiliesController');
const Families = require("../models/Courses");
const isAuth = require("../middlewares/is-auth");
router.get("/family", isAuth, familiesController.GetFamily);
router.get("/save-family", isAuth, familiesController.GetSaveFamily);
router.post("/save-family", isAuth, familiesController.PostSaveFamily);
router.get("/edit-family/:familyId", isAuth, familiesController.getEditFamily);
router.post("/edit-family", isAuth, familiesController.postEditFamily);


module.exports = router;