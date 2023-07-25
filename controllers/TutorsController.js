const Tutor = require("../models/Tutors");
//Obtener la vista del listados
exports.GetTutor = (req, res, next) => {

    Tutor.findAll()
        .then((result) => {
            const Tutor = result.map((result) => result.dataValues);

            //Se rederiza la vista dependiendo de su ubicacion.
            res.render("tutors/tutors-lists", {
                pageTitle: "Tutors",
                tutorsActive: true,
                tutor: Tutor,
                hasTutor: Tutor.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });

};

//obtener la vista de guardar
exports.GetSaveTutor = (req, res, next) => {


    Tutor.findAll().then((result) => {

        const tutor = result.map((result) => result.dataValues);


        res.render("tutors/save-tutor", {

            pageTitle: "Administra Tutores.",
            tutor: tutor,
            hasTutor: tutor.length > 0,


        });

    });


};

//Guarda los datos al momento de presionar el boton guardar.
exports.PostSaveTutor = (req, res, next) => {

    //Se toma el Nombre que se le asigna en la vista.
    const nombre = req.body.Name;
    const cedula = req.body.Cedula;
    const apellido = req.body.LastName;

    Tutor.create({
        name: nombre,
        cedula: cedula,
        lastname: apellido,


    }).then((result) => {

        return res.redirect("/tutor");

    }).catch((error) => {

        console.log(error);

    });

}

//obtener la vista de los estudiantes a editar cursos

exports.getEditTutor = (req, res, next) => {
    const edit = req.query.edit;
    const tutorId = req.params.tutorId;

    if (!edit) {
        return res.redirect("/tutor");
    }

    Tutor.findOne({ where: { id: tutorId } }).then((result) => {
        const tutors = result.dataValues;
        if (!tutors) {
            return res.redirect("/tutor");
        }

        Tutor.findAll().then((result2) => {

            const tutor = result2.map((result2) => result2.dataValues);

            console.log(tutor.length > 0);
            res.render("tutors/save-tutor", {
                pageTitle: "Editar-tutores",
                tutorActive: true,
                tutor: tutors,
                editMode: edit,
                hasTutor: Tutor.length > 0
            });
        }).catch(err => {
            console.log(err);
        });
    }).catch(err2 => {
        console.log(err2);
    });


};

//Guarda los cursos al momento de presionar el boton guardar.
exports.postEditTutor = (req, res, next) => {
    const name = req.body.Name;
    const lastname = req.body.LastName;
    const cedula = req.body.Cedula;
    const id = req.body.tutorId;

    Tutor.findOne({ where: { id: id } }).then((result) => {

        const tutors = result.dataValues;

        if (!tutors) {
            return res.redirect("/tutor");
        }


        Tutor.update({ name: name, lastname: lastname, cedula: cedula }, { where: { id: id } })
            .then((result) => {
                return res.redirect("/tutor");
            }).catch((err) => {
                console.log(err);
            });
    }).catch((err1) => {
        console.log(err1);
    });
}