const Family = require("../models/Families");


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

//obtener la vista de los estudiantes a editar cursos

exports.getEditFamily = (req, res, next) => {
    const edit = req.query.edit;
    const familyId = req.params.familyId;

    if(!edit){
        return res.redirect("families/families-lists");
    }

    Family.findOne({where: {id: familyId}}).then((result) => {
        const familys = result.dataValues;
        if(!familys){
            return res.redirect("families/families-lists");
        }

        Family.findAll().then((result2) => {
            
         const family = result2.map((result2) => result2.dataValues );
                
            console.log (family.length > 0);
                res.render("families/save-family",
                    {pageTitle: "Editar-familias",
                    familyActive: true,
                    family: Family,
                    hasFamily: Family.length > 0});
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err2 => {
                console.log(err2);
            });
   
    
};

//Guarda los cursos al momento de presionar el boton guardar.
exports.postEditFamily = (req, res, next) => {
    const name = req.body.name;
    const id = req.body.familyId;

    Course.findOne({where: {id: id}}).then((result) => {

        const familys = result.dataValues;

        if(!familys){
            return res.redirect("families/save-family");
        }


    Course.update({name: name}, {where: {id: id}})
    .then((result) => {
        return res.redirect("families/save-family");
    }).catch((err) => {
        console.log(err);
    });
}).catch((err1) => {
    console.log(err1);
});
}