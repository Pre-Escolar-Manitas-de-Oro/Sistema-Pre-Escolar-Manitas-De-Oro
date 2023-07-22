const Family = require("../models/Courses");


//Obtener la vista del listados
exports.GetFamily = (req, res, next) => {

    Family.findAll()
        .then((result) => {
            const Family = result.map((result) => result.dataValues);

            //Se rederiza la vista dependiendo de su ubicacion.
            res.render("families/families-lists", {
                pageTitle: "Families",
                familyActive: true,
                family: Family,
                hasFamily: Family.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });

};

//obtener la vista de guardar
exports.GetSaveFamily = (req, res, next) => {

    res.render("families/save-family", {

        pageTitle: "Administra Familias.",

    });


};

//Guarda los datos al momento de presionar el boton guardar.
exports.PostSaveFamily = (req, res, next) => {

    const nombre = req.body.Name;

    Family.create({
        name: nombre,


    }).then((result) => {

        return res.redirect("/family");

    }).catch((error) => {


        console.log(error);

    });

}