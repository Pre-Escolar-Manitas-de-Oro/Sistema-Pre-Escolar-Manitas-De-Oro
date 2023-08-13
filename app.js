//importar las dependecias
const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars");
const ErrorController = require("./controllers/ErrorControlller");
const sequelize = require("./util/database");
const flash = require("connect-flash");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");

// importar los modelos.


const Courses = require("./models/Courses");

const Families = require("./models/Families");

const Tutors = require("./models/Tutors");

const Students = require("./models/Students");

const Users = require("./models/User");

const Payments = require("./models/Payments");

const Batches = require("./models/Batches");

const SchoolYear = require("./models/Schoool_Year");

const Months = require("./models/Months");


//importar las rutas.

const student = require("./routes/student");

const families = require("./routes/families");

const courses = require("./routes/courses");

const tutors = require("./routes/tutors");

const schoolyears = require("./routes/schoolyear");
const payments = require("./routes/payments");
const loginRouter = require("./routes/login");

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


app.use(session({ secret: "anything", resave: false, saveUninitialized: false }));
app.use(flash());

app.use((req, res, next) => {
    const errors = req.flash("errors");

    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.userd = req.session.userdata;
    res.locals.errorMessages = errors;
    res.locals.hasErrorMessages = errors.length > 0;
    next();
})


//Inicializacion de las rutas

app.use(loginRouter);
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

Payments.belongsTo(Months, { constraint: true, onDelete: "CASCADE" });
Months.hasMany(Payments);

Payments.belongsTo(Batches, { constraint: true, onDelete: "CASCADE" });
Batches.hasMany(Payments);

Tutors.belongsTo(Families, { constraint: true, onDelete: "CASCADE" });
Families.hasMany(Tutors);



// Sincroniza el modelo "Mensualidad" para crear la tabla si no existe
sequelize.query("SHOW TABLES LIKE 'months'")
    .then(([results, metadata]) => {
        const tableExists = results.length > 0;
        if (!tableExists) {
            // La tabla no existe, proceder a crearla e insertar los meses
            return Months.sync({ alter: true }) // Crea la tabla si no existe
                .then(() => {
                    return Months.bulkCreate([
                        { month: 'Septiembre' },
                        { month: 'Octubre' },
                        { month: 'Noviembre' },
                        { month: 'Diciembre' },
                        { month: 'Enero' },
                        { month: 'Febrero' },
                        { month: 'Marzo' },
                        { month: 'Abril' },
                        { month: 'Mayo' },
                        { month: 'Junio' },
                    ]);
                });
        } else {
            // La tabla ya existe, no es necesario crearla ni insertar los meses
            return Promise.resolve();
        }
    })
    .then(() => {

        console.log('Tabla "mensualidad" creada e insertada correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la tabla "mensualidad":', error);
    });

// Sincroniza el modelo "Batches" para crear la tabla si no existe
sequelize.query("SHOW TABLES LIKE 'batches'")
    .then(([results, metadata]) => {
        const tableExists = results.length > 0;
        if (!tableExists) {
            // La tabla no existe, proceder a crearla e insertar las tandas
            return Batches.sync({ alter: true }) // Crea la tabla si no existe
                .then(() => {
                    return Batches.bulkCreate([
                        { name: 'Mensualidad', price: '6000' },
                        { name: 'Hasta las 2', price: '9000' },
                        { name: 'Tanda extendida', price: '11000' },
                    ]);
                });
        } else {
            // La tabla ya existe, no es necesario crearla ni insertar las tandas
            return Promise.resolve();
        }
    })
    .then(() => {

        console.log('Tabla "tandas" creada e insertada correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la tabla "tandas":', error);
    });

sequelize.query("SHOW TABLES LIKE 'users'")
    .then(([results, metadata]) => {
        const tableExists = results.length > 0;
        if (!tableExists) {
            // La tabla no existe, proceder a crearla e insertar los usuarios
            return Users.sync({ alter: true }) // Crea la tabla si no existe
                .then(() => {
                    // Hash de las contraseñas
                    return Promise.all([
                        bcrypt.hash('manitasadmin123', 12),
                        bcrypt.hash('RosaSC123', 12)
                    ]).then(([hashedAdminPassword, hashedSecretariaPassword]) => {
                        return Users.bulkCreate([
                            { name: 'admin', lastname: 'admin', username: 'admin', email: 'admin@dummy.com', password: hashedAdminPassword, role: 'Admin' },
                            { name: 'Rosa', lastname: 'Cedano', username: 'Rosa', email: 'Rosa@dummy.com', password: hashedSecretariaPassword, role: 'Secretaria' }
                        ]);
                    });
                });
        } else {
            // La tabla ya existe, no es necesario crearla ni insertar las tandas
            return Promise.resolve();
        }
    })
    .then(() => {

        console.log('Tabla "usuarios" creada e insertada correctamente.');
    })
    .catch((error) => {
        console.error('Error al crear la tabla "usuarios":', error);
    });



sequelize.sync({ alter: true })
    .then(() => {
        // Una vez que se hayan sincronizado todos los modelos, puedes continuar con el código
        app.listen(44198);
        console.log('Todas las tablas creadas e insertadas correctamente.');
    })
    .catch((error) => {
        console.error('Error al sincronizar y crear las tablas:', error);
    });