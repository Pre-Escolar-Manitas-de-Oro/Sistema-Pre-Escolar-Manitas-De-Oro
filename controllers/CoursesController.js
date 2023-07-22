const Course = require("../models/Courses");


//Obtener la vista del listado
exports.GetCourse = (req, res, next) => {

    Course.findAll()
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

    res.render("courses/save-course", {

        pageTitle: "Administra Cursos.",

    });


};

//Guarda los cursos al momento de presionar el boton guardar.
exports.PostSaveCourse = (req, res, next) => {

    const nombre = req.body.Name;

    Autor.create({
        name: nombre,


    }).then((result) => {

        return res.redirect("/course");

    }).catch((error) => {


        console.log(error);

    });

}