const Student = require("../models/Students");
const Family = require("../models/Families");
const Course = require("../models/Courses");
const Tutor = require("../models/Tutors");


//Obtener la vista del listados

exports.GetIndex = (req, res, next) => {
    
               
                    Student.findAll({ include: [{ model: Family }] })
                        .then((result) => {
                            const student = result.map((result) => result.dataValues);
                            res.render("student/index", {
                                pageTitle: "Estudiantes",
                                homeActive: false,
                                estudiante: student,
                                hasEstudiantes: student.length > 0,
                                family: family,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                
                   
            
};


//obtener la vista de administrar estudiante.
exports.GetAdminStudent = (req, res, next) => {

        Family.findAll().then((result1) => {
            const family = result1.map((result1) => result1.dataValues);
            Student.findAll({ include: [{ model: Family }] })
                .then((result) => {
                    const student = result.map((result) => result.dataValues);
                    res.render("student/admin-student", {
                        pageTitle: "Administra estudiantes",
                        homeActive: false,
                        estudiante: student,
                        hasEstudiantes: student.length > 0,
                        family: family,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .catch((err1) => {
                console.log(err1);
      });
};


//obtener la vista de guardar

exports.GetSaveStudent = (req, res, next) => {

  
    Family.findAll()
        .then((result) => {
            const family = result.map((result) => result.dataValues);
                res.render("student/save-student", {
                    pageTitle: "Crear Estudiante.",
                    homeActive: false,
                    editMode: false,
                    family: family,
                    hasFamily: family.length > 0,
                });

            }).catch(err => {
                console.log(err);
            });

                

}



//Guarda los datos al momento de presionar el boton guardar.
exports.PostSaveStudent = (req, res, next) => {
    const estudianteName = req.body.name;
    const estudianteBirthDate = req.body.birthdate;
    const estudianteFamiliy = req.body.familys;
    const estudianteApellido = req.body.lastname;
   


    Student.create({
            name: estudianteName,
            lastname: estudianteApellido,
            familyId: estudianteFamiliy,
            birthdate: estudianteBirthDate,
        })
        .then((result) => {
            res.redirect("/admin-student");

        })
        .catch((err) => {
            console.log(err);
        });
};

//obtener la vista de editar
exports.getEditStudent = (req, res, next) => {
    const edit = req.query.edit;
    const studentId = req.params.studentId;

    if (!edit) {
        return res.redirect("/admin-student");
    }

    Student.findOne({ where: { id: studentId } }).then((result) => {
        const student = result.dataValues;
        if (!student) {
            return res.redirect("/admin-student");
        }
        Family.findAll().then((result2) => {
            

                    const family = result2.map((result2) => result2.dataValues);
                    
                    res.render("student/save-student", {
                        pageTitle: "Editar-students",
                        homeActive: true,
                        editMode: edit,
                        student: student,
                        family: family,
                        hasFamily: family.length > 0,
                    });
                }).catch(err4 => {
                    console.log(err4);
                });
            }).catch(err3 => {
                console.log(err3);
            });




};
//Guarda los datos al momento de presionar el boton editar.
exports.postEditStudent = (req, res, next) => {
    const estudianteName = req.body.name;
    const estudianteBirthDate = req.body.birthdate;
    const estudianteFamiliy = req.body.familys;
    const estudianteApellido = req.body.lastname;
    const id = req.body.studentId;

    Student.findOne({ where: { id: id } }).then((result) => {

        const student = result.dataValues;

        if (!student) {
            return res.redirect("/admin-student");
        }

        Student.update({
                name: estudianteName,
                lastname: estudianteApellido,
                familyId: estudianteFamiliy,
                birthdate: estudianteBirthDate,
            }, { where: { id: id } })
            .then((result) => {
                return res.redirect("/admin-student");
            }).catch((err) => {
                console.log(err);
            });
    }).catch((err) => {
        console.log(err);
    });

};