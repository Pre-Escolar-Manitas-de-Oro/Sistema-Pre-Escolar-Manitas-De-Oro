// controllers/paymentController.js
const Payment = require("../models/Payments");
const Student = require("../models/Students");
const Month = require("../models/Months");
const SchoolYear = require("../models/Schoool_Year");
const Batches = require("../models/Batches");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

// Mostrar el formulario para registrar pagos
exports.getPaymentForm = (req, res, next) => {

    Student.findAll()
        .then((result) => {
            const students = result.map((result) => result.dataValues);

            SchoolYear.findAll().then((result) => {

                const schoolyear = result.map((result) => result.dataValues);

                Month.findAll().then((result) => {

                    const month = result.map((result) => result.dataValues);

                    Batches.findAll().then((result) => {

                        const batches = result.map((result) => result.dataValues);


                        Payment.findAll({
                            include: [
                                { model: Student },
                                { model: SchoolYear },
                                { model: Month },
                                { model: Batches },
                            ]
                        }).then((result) => {

                            const payment = result.map((result) => result.dataValues);

                            console.log(payment.dataValues);

                            //Se rederiza la vista dependiendo de su ubicacion.
                            res.render("payments/form", {
                                pageTitle: "Registro de pago",
                                student: students,
                                payment: payment,
                                batches: batches,
                                schoolyear: schoolyear,
                                month: month,
                                hasPayments: payment.length > 0,
                                hasStudents: students.length > 0,
                                hasSchoolYear: schoolyear.length > 0,
                            });


                        });
                    });
                });
            });
        });
};

exports.getAllPayments = (req, res, next) => {

    Student.findAll()
        .then((result) => {
            const students = result.map((result) => result.dataValues);
            Month.findAll().then((result) => {
                const month = result.map((result) => result.dataValues);

                Payment.findAll({
                    include: [
                        { model: Student },
                        { model: SchoolYear },
                        { model: Month },
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
                            month: month,
                        });


                    });

                });
            });
        });
};


function generateReceiptNumber() {
    // Generar un identificador único
    const uniqueId = uuidv4();

    // Obtener la fecha actual en formato "yyyyMMdd"
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    // Combina el identificador único con la fecha actual para obtener un número de recibo único
    const receiptNumber = `${currentDate}-${uniqueId}`;

    return receiptNumber;
}

function obtenerFechaHoraActual() {
    const fechaHoraActual = new Date();

    const año = fechaHoraActual.getFullYear();
    const mes = String(fechaHoraActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaHoraActual.getDate()).padStart(2, '0');

    const hora = String(fechaHoraActual.getHours()).padStart(2, '0');
    const minutos = String(fechaHoraActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaHoraActual.getSeconds()).padStart(2, '0');

    const fechaHoraFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    return fechaHoraFormateada;
}

// Guardar el pago en la base de datos
exports.savePayment = (req, res) => {
    const { amount, concept, method, studentId, schoolyearId, monthId } = req.body;

    console.log(amount)

    const receiptNumber = generateReceiptNumber();
    const currentDate = obtenerFechaHoraActual();

    Payment.create({
            date: currentDate,
            monto: amount,
            concepto: concept,
            numero_recibo: receiptNumber,
            metodo: method,
            studentId: studentId,
            schoolyearId: schoolyearId,
            monthId: monthId,
        })
        .then((payment) => {
            Student.findOne({ where: { id: studentId } }).then((result) => {
                    const student = result.dataValues;

                    if (!student) {
                        return res.redirect("/");
                    }

                    Student.update({
                            isActive: true,
                        }, { where: { id: payment.studentId } })
                        .then(() => {
                            // Fetch the associated Student and SchoolYear models for the created Payment
                            Payment.findOne({
                                where: { id: payment.id },
                                include: [
                                    { model: Student },
                                    { model: SchoolYear },
                                    { model: Month },
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



exports.generatePDF = async(req, res, next) => {
    const id = req.params.paymentId;

    try {
        const payment = await Payment.findOne({ where: { id: id } });
        const student = await Student.findOne({ where: { id: payment.studentId } });
        const schoolYear = await SchoolYear.findOne({ where: { id: payment.schoolyearId } });
        const month = await Month.findOne({ where: { id: payment.monthId } });

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([400, 300]);

        const fontSize = 12;
        const textContent = `Recibo de pago\n\nFecha: ${payment.date}\nConcepto: ${payment.concepto}\nMonto: $${payment.monto}
\nEstudiante:${student.name} ${student.lastname}\nMétodo de pago: ${payment.metodo}\nMes pagado: ${month.month}\nAño Escolar: ${schoolYear.dateunited}`;

        page.drawText(textContent, {
            x: 50,
            y: page.getHeight() - 50,
            size: fontSize,
            color: rgb(0, 0, 0),
        });

        const pdfBytes = await pdfDoc.save();

        // Set response headers to trigger download
        res.setHeader('Content-Disposition', 'attachment; filename=recibo.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.end(pdfBytes);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
};