 // routes/paymentRoutes.js
 const express = require("express");
 const router = express.Router();
 const paymentController = require("../controllers/PaymentController");

 // Mostrar el formulario para registrar pagos
 router.get("/payments/form", paymentController.getPaymentForm);
 router.get("/payments", paymentController.getAllPayments);

 // Guardar el pago en la base de datos
 router.post("/payments", paymentController.savePayment);

 module.exports = router;