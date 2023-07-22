const Student = require("../models/Students");
const Family = require("../models/Families");
const Course = require("../models/Courses");
const Tutor = require("../models/Tutors");


//Obtener la vista del listados

exports.GetIndex = (req, res, next) => {
    Course.findAll()
        .then((result) => {
            const course = result.map((result) => result.dataValues);
            Tutor.findAll().then((result) => {
                const tutor = result.map((result) => result.dataValues);
                Family.findAll().then((result) => {
                    const family = result.map((result) => result.dataValues);
                    Student.findAll({ include: [{ model: Course }, { model: Tutor }, { model: Family }] })
                        .then((result) => {
                            const student = result.map((result) => result.dataValues);
                            res.render("student/index", {
                                pageTitle: "Estudiantes",
                                homeActive: true,
                                estudiante: student,
                                hasEstudiantes: student.length > 0,
                                course: course,
                                tutor: tutor,
                                family: family,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            });
        });
};


//obtener la vista de administrar estudiante.
exports.GetAdminStudent = (req, res, next) => {

    Student.findAll({ include: [{ model: Course }, { model: Tutor }, { model: Family }] })
        .then((result) => {

            const student = result.map((result) => result.dataValues);
            res.render("student/admin-student", {
                pageTitle: "Administra estudiantes",
                estudiante: student,
                hasEstudiantes: student.length > 0

            });
        })
        .catch((err) => {
            console.log(err);
        });
};


//obtener la vista de guardar

exports.GetSaveStudent = (req, res, next) => {

    Course.findAll()
        .then((result) => {
            const course = result.map((result) => result.dataValues);
            Tutor.findAll()
                .then((result) => {
                    const tutor = result.map((result) => result.dataValues);
                    Family.findAll()
                        .then((result) => {
                            const family = result.map((result) => result.dataValues);
                            res.render("student/save-student", {
                                pageTitle: "Crear Estudiante.",
                                homeActive: false,
                                editMode: false,
                                course: course,
                                hasCourses: course.length > 0,
                                family: family.length > 0,
                                hasFamily: family.length > 0,
                                tutor: tutor,
                                hasTutors: tutor.length > 0,
                            });

                        })

                })
                .catch((err) => {
                    console.log(err);

                }).catch((err) => {
                    console.log(err);
                });
        });

}



//Guarda los datos al momento de presionar el boton guardar.
exports.PostSaveStudent = (req, res, next) => {
    const estudianteName = req.body.Name;
    const estudianteBirthDate = req.body.Date;
    const estudiantePhone = req.body.Phone;
    const estudianteTutor = req.body.Tutor;
    const estudianteFamiliy = req.body.Family;
    const estudianteApellido = req.body.LastName;
    const estudianteCourse = req.body.Course;


    Libro.create({
            name: estudianteName,
            lastname: estudianteApellido,
            courseId: estudianteCourse,
            familyId: estudianteFamiliy,
            tutorId: estudianteTutor,
            birthdate: estudianteBirthDate,
            phone: estudiantePhone,
        })
        .then((result) => {
            res.redirect("/admin-student");

        })
        .catch((err) => {
            console.log(err);
        });
};