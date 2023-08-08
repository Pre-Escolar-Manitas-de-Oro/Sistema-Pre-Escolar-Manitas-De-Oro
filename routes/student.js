const express = require("express");
const path = require("path");

const router = express.Router();

const studentController = require("../controllers/studentController");

// Agregar ruta y lógica para cambiar el acceso del estudiante
router.post("/students/:studentId/toggle-access", studentController.toggleStudentAccess);
router.post("/students/:studentId/toggle-access", studentController.toggleStudentAccess);
router.get("/", studentController.GetIndex);
router.get("/admin-student", studentController.GetAdminStudent);
router.get("/save-student", studentController.GetSaveStudent);
router.post("/save-student", studentController.PostSaveStudent);
router.get("/edit-student/:studentId", studentController.getEditStudent);
router.post("/edit-student", studentController.postEditStudent);

module.exports = router;