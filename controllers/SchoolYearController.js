const { DATEONLY } = require("sequelize");
const SchoolYear = require("../models/Schoool_Year");
//Obtener la vista del listados
exports.GetSchoolYear = (req, res, next) => {

    SchoolYear.findAll()
        .then((result) => {
            const year = result.map((result) => result.dataValues);

            //Se rederiza la vista dependiendo de su ubicacion.
            res.render("schoolyear/schoolyear-lists", {
                pageTitle: "Año Escolar",
                schoolyearActive: true,
                year: year,
                hasSchoolyear: year.length > 0
            });

        })
        .catch((err) => {
            console.log(err);
        });

};

//obtener la vista de guardar
exports.GetSaveSchoolYear = (req, res, next) => {


    SchoolYear.findAll().then((result) => {

        const schoolyear = result.map((result) => result.dataValues);


        res.render("schoolyear/save-schoolyear", {

            pageTitle: "Administra Años escolares.",
            schoolyear: schoolyear,
            hasSchoolyear: SchoolYear.length > 0,


        });

    });


};

//Guarda los datos al momento de presionar el boton guardar.
exports.PostSaveSchoolyear = (req, res, next) => {

    //Se toma el Nombre que se le asigna en la vista.
    const date = req.body.Date;
    const date2 = req.body.Date2;


    SchoolYear.create({
        date: date,
        date2: date2,
        dateunited: date + "-" + date2,
    }).then((result) => {

        return res.redirect("/schoolyear");

    }).catch((error) => {

        console.log(error);

    });

}

//obtener la vista de los estudiantes a editar cursos

exports.getEditSchoolyear = (req, res, next) => {
    const edit = req.query.edit;
    const schoolyearId = req.params.schoolyearId;

    if (!edit) {
        return res.redirect("/schoolyear");
    }

    SchoolYear.findOne({ where: { id: schoolyearId } }).then((result) => {
        const schoolyear = result.dataValues;
        if (!schoolyear) {
            return res.redirect("/schoolyear");
        }

        SchoolYear.findAll().then((result2) => {

            const schoolyears = result2.map((result2) => result2.dataValues);

            console.log(schoolyear.length > 0);
            res.render("schoolyear/save-schoolyear", {
                pageTitle: "Editar Años escolares",
                tutorActive: true,
                schoolyear: schoolyear,
                editMode: edit,
                hasSchoolyear: SchoolYear.length > 0
            });
        }).catch(err => {
            console.log(err);
        });
    }).catch(err2 => {
        console.log(err2);
    });


};

//Guarda los cursos al momento de presionar el boton guardar.
exports.postEditSchoolyear = (req, res, next) => {
    const date = req.body.Date;
    const date2 = req.body.Date2;
    const id = req.body.schoolyearId;

    SchoolYear.findOne({ where: { id: id } }).then((result) => {

        const schoolyear = result.dataValues;

        if (!schoolyear) {
            return res.redirect("/schoolyear");
        }


        SchoolYear.update({ date: date, date2: date2, dateunited: date + "-" + date2 }, { where: { id: id } })
            .then((result) => {
                return res.redirect("/schoolyear");
            }).catch((err) => {
                console.log(err);
            });
    }).catch((err1) => {
        console.log(err1);
    });
}