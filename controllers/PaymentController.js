// controllers/paymentController.js
const Payment = require("../models/Payments");
const Student = require("../models/Students");
const SchoolYear = require("../models/Schoool_Year");


// Mostrar el formulario para registrar pagos
exports.getPaymentForm = (req, res, next) => {

    Student.findAll()
        .then((result) => {
            const students = result.map((result) => result.dataValues);



            SchoolYear.findAll().then((result) => {

                const schoolyear = result.map((result) => result.dataValues);

                Payment.findAll({
                    include: [
                        { model: Student },
                        { model: SchoolYear }
                    ]
                }).then((result) => {

                    const payment = result.map((result) => result.dataValues);

                    //Se rederiza la vista dependiendo de su ubicacion.
                    res.render("payments/form", {
                        pageTitle: "Registro de pago",
                        student: students,
                        payment: payment,
                        schoolyear: schoolyear,
                        hasPayments: payment.length > 0,
                        hasStudents: students.length > 0,
                    });


                });

            });
        });
};

exports.getAllPayments = (req, res, next) => {

    Student.findAll()
        .then((result) => {
            const students = result.map((result) => result.dataValues);

            Payment.findAll({
                include: [
                    { model: Student },
                    { model: SchoolYear }
                ]
            }).then((result) => {

                const payment = result.map((result) => result.dataValues);

                console.log(payment);

                SchoolYear.findAll().then((result) => {
                    const schoolyear = result.map((result) => result.dataValues);
                    //Se rederiza la vista dependiendo de su ubicacion.
                    res.render("payments/pagos", {
                        pageTitle: "Pagos",
                        student: students,
                        payment: payment,
                        schoolyear: schoolyear,
                        hasPayments: payment.length > 0,
                        hasStudents: students.length > 0,
                    });


                });

            });

        });
};


// Guardar el pago en la base de datos
exports.savePayment = (req, res) => {
    const { date, amount, concept, receiptNumber, method, studentId, schoolyearId } = req.body;

    Payment.create({
            date: date,
            monto: amount,
            concepto: concept,
            numero_recibo: receiptNumber,
            metodo: method,
            studentId: studentId,
            schoolyearId: schoolyearId,
        })
        .then((payment) => {
            Student.findOne({ where: { id: studentId } }).then((result) => {
                    const student = result.dataValues;

                    if (!student) {
                        return res.redirect("/");
                    }

                    Student.update({
                            active: true,
                        }, { where: { id: payment.studentId } })
                        .then(() => {
                            // Fetch the associated Student and SchoolYear models for the created Payment
                            Payment.findOne({
                                where: { id: payment.id },
                                include: [
                                    { model: Student },
                                    { model: SchoolYear }
                                ]
                            }).then((result) => {
                                const paymentWithAssociations = result.dataValues;

                                // Renderizar la vista de confirmación con el pago realizado
                                res.render("payments/confirmation", {
                                    pageTitle: "Confirmación de Pago",
                                    payment: paymentWithAssociations,
                                });
                            }).catch((err) => {
                                console.log(err);
                                res.status(500).send("Error en el servidor");
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send("Error en el servidor");
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error en el servidor");
        });
};