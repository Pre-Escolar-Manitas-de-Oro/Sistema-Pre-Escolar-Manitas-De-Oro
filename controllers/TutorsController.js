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
        apellido: apellido,


    }).then((result) => {

        return res.redirect("/tutor");

    }).catch((error) => {

        console.log(error);

    });

}