 // routes/paymentRoutes.js
 const express = require("express");
 const router = express.Router();
 const paymentController = require("../controllers/PaymentController");
 const isAuth = require("../middlewares/is-auth");
 // Mostrar el formulario para registrar pagos
 router.get("/payments/form", isAuth, paymentController.getPaymentForm);
 router.get("/payments", isAuth, paymentController.getAllPayments);
 router.post("/payments/:paymentId/toggle-access", isAuth, paymentController.generatePDF);
 // Guardar el pago en la base de datos
 router.post("/payments", isAuth, paymentController.savePayment);

 module.exports = router;