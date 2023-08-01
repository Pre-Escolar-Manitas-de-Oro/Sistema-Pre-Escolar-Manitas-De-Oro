const Course = require("../models/Courses");
const School_Year = require("../models/Schoool_Year");

//Obtener la vista del listado
exports.GetCourse = (req, res, next) => {

    Course.findAll({ include: [{ model: School_Year }] })
        .then((result) => {
            const Course = result.map((result) => result.dataValues);

            //Se rederiza la vista dependiendo de su ubicacion.
            res.render("courses/courses-lists", {
                pageTitle: "Cursos",
                courseActive: true,
                course: Course,
                hasCourse: Course.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });

};

//obtener la vista de guardar cursos
exports.GetSaveCourse = (req, res, next) => {

    School_Year.findAll().then((result1) => {

        const year = result1.map((result1) => result1.dataValues);

        Course.findAll({ include: [{ model: School_Year }] }).then((result) => {

            const course = result.map((result) => result.dataValues);


            res.render("courses/save-course", {

                pageTitle: "Administra Cursos.",
                course: course,
                schoolyear: year,


            });



        });


    });
};

//Guarda los cursos al momento de presionar el boton guardar.
exports.PostSaveCourse = (req, res, next) => {

    const nombre = req.body.Name;
    const cursoAnoEscolar = req.body.schoolyear;

    Course.create({
        name: nombre,
        schoolyearId: cursoAnoEscolar,


    }).then((result) => {

        return res.redirect("/course");

    }).catch((error) => {


        console.log(error);

    });

}

//obtener la vista de los estudiantes a editar cursos

exports.getEditCourse = (req, res, next) => {
    const edit = req.query.edit;
    const coursesId = req.params.coursesId;

    if (!edit) {
        return res.redirect("/course");
    }

    Course.findOne({ where: { id: coursesId } }).then((result) => {
        const courses = result.dataValues;
        if (!courses) {
            return res.redirect("/course");
        }

        Course.findAll().then((result2) => {

            const course = result2.map((result2) => result2.dataValues);


            School_Year.findAll().then((result2) => {
                const year = result2.map((result2) => result2.dataValues);
                console.log(course.length > 0);
                res.render("courses/save-course", {
                    pageTitle: "Editar-cursos",
                    courseActive: true,
                    editMode: edit,
                    courses: courses,
                    course: courses,
                    schoolyear: year,
                    hasCourse: Course.length > 0
                });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err2 => {
            console.log(err2);
        });

    });
};

//Guarda los cursos al momento de presionar el boton guardar.
exports.postEditCourse = (req, res, next) => {
    const name = req.body.Name;
    const id = req.body.coursesId;
    const year = req.body.schoolyear
    Course.findOne({ where: { id: id } }).then((result) => {

        const courses = result.dataValues;

        if (!courses) {
            return res.redirect("/course");
        }

        Course.update({ name: name, schoolyearId: year }, { where: { id: id } })
            .then((result) => {
                return res.redirect("/course");
            }).catch((err) => {
                console.log(err);
            });
    }).catch((err1) => {
        console.log(err1);
    });
}