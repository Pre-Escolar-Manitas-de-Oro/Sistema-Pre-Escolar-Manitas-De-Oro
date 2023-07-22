//importar las dependecias
const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars");
const ErrorController = require("./controllers/ErrorControlller");
const sequelize = require("./util/database");


// importar los modelos.


const Courses = require("./models/Courses");

const Families = require("./models/Families");

const Tutors = require("./models/Tutors");

const Students = require("./models/Students");



//importar las rutas.

const student = require("./routes/student");

const families = require("./routes/families");

const courses = require("./routes/courses");

const tutors = require("./routes/tutors");



//importar helpers.

const comparador = require("./util/helpers/hbs/comparar");


app.engine('hbs', expressHbs.engine({

    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {

        IgualValor: comparador.IgualValor,

    },

}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


//Inicializacion de las rutas

app.use(student);
app.use(courses);
app.use(families);
app.use(tutors);
app.use("/", ErrorController.Get404);



//Relaciones.

Students.belongsTo(Courses, { constraint: true, onDelete: "CASCADE" });
Courses.hasMany(Students);


Students.belongsTo(Families, { constraint: true, onDelete: "CASCADE" });
Families.hasMany(Students);

Students.belongsTo(Tutors, { constraint: true, onDelete: "CASCADE" });
Tutors.hasMany(Students);


sequelize.sync( /*{alter: false}*/ ).then(function(result) {

    app.listen(44198);

}).catch(err => {

    console.log(err);

})