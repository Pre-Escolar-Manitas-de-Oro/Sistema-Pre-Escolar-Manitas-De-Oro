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

//obtener la vista de los estudiantes a editar cursos

exports.getEditCourse = (req, res, next) => {
    const edit = req.query.edit;
    const coursesId = req.params.coursesId;

    if(!edit){
        return res.redirect("courses/courses-lists");
    }

    Course.findOne({where: {id: coursesId}}).then((result) => {
        const courses = result.dataValues;
        if(!courses){
            return res.redirect("courses/courses-lists");
        }

        Course.findAll().then((result2) => {
            
         const course = result2.map((result2) => result2.dataValues );
                
            console.log (course.length > 0);
                res.render("courses/save-course",
                    {pageTitle: "Editar-cursos",
                    courseActive: true,
                    course: Course,
                    hasCourse: Course.length > 0});
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err2 => {
                console.log(err2);
            });
   
    
};

//Guarda los cursos al momento de presionar el boton guardar.
exports.postEditCourse = (req, res, next) => {
    const name = req.body.name;
    const id = req.body.coursesId;

    Course.findOne({where: {id: id}}).then((result) => {

        const courses = result.dataValues;

        if(!courses){
            return res.redirect("courses/courses-lists");
        }


    Course.update({name: name}, {where: {id: id}})
    .then((result) => {
        return res.redirect("courses/courses-lists");
    }).catch((err) => {
        console.log(err);
    });
}).catch((err1) => {
    console.log(err1);
});
}