const express = require("express");
const path = require("path");

const router = express.Router();

const studentController = require("../controllers/studentController");
const isAuth = require("../middlewares/is-auth");
// Agregar ruta y lógica para cambiar el acceso del estudiante
router.post("/students/:studentId/toggle-access", isAuth, studentController.toggleStudentAccess);
router.post("/students/:studentId/toggle-access", isAuth, studentController.toggleStudentAccess);
router.get("/", isAuth, studentController.GetIndex);
router.get("/admin-student", isAuth, studentController.GetAdminStudent);
router.get("/save-student", isAuth, studentController.GetSaveStudent);
router.post("/save-student", isAuth, studentController.PostSaveStudent);
router.get("/edit-student/:studentId", isAuth, studentController.getEditStudent);
router.post("/edit-student", isAuth, studentController.postEditStudent);

module.exports = router;