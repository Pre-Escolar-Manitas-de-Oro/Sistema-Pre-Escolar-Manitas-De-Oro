const express = require('express');

const router = express.Router();

const loginController = require('../controllers/LoginController');
const isAuth = require("../middlewares/is-auth");

router.get("/login", loginController.getLogin);
router.post("/login", loginController.PostLogin);
router.get("/logout", isAuth, loginController.getLogout);

module.exports = router;