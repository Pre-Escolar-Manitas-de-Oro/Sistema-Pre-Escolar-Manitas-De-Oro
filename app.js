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

const Users = require("./models/User");

const Payments = require("./models/Payments");

const SchoolYear = require("./models/Schoool_Year");


//importar las rutas.

const student = require("./routes/student");

const families = require("./routes/families");

const courses = require("./routes/courses");

const tutors = require("./routes/tutors");

const schoolyears = require("./routes/schoolyear");
const payments = require("./routes/payments");


//importar helpers.

const comparador = require("./util/helpers/hbs/comparar");
const compare = require("./util/helpers/hbs/compare");

app.engine('hbs', expressHbs.engine({

    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {

        IgualValor: comparador.IgualValor,
        equals: compare.equals,

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
app.use(schoolyears);
app.use(payments);
app.use("/", ErrorController.Get404);



//Relaciones.

Students.belongsTo(Courses, { constraint: true, onDelete: "CASCADE" });
Courses.hasMany(Students);

Students.belongsTo(Families, { constraint: true, onDelete: "CASCADE" });
Families.hasMany(Students);

Courses.belongsTo(SchoolYear, { constraint: true, onDelete: "CASCADE" });
SchoolYear.hasMany(Courses);

Payments.belongsTo(SchoolYear, { constraint: true, onDelete: "CASCADE" });
SchoolYear.hasMany(Payments);

Payments.belongsTo(Students, { constraint: true, onDelete: "CASCADE" });
Students.hasMany(Payments);

Tutors.belongsTo(Families, { constraint: true, onDelete: "CASCADE" });
Families.hasMany(Tutors);


sequelize.sync({ alter: true }).then(function(result) {

    app.listen(44198);

}).catch(err => {

    console.log(err);

})