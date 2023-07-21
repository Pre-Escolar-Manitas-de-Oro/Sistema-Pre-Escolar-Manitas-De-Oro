//importar las dependecias
const express = require("express");
const path = require("path");
const app = express();
const expressHbs = require("express-handlebars");
const ErrorController = require("./Controller/ErrorController");
const sequelize = require("./util/database");


// importar los modelos.




//importar las rutas.


app.engine('hbs', expressHbs({

    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {},

}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", ErrorController.Get404);

sequelize.sync().then(function(result) {

    app.listen(44198);

}).catch(err => {

    console.log(err);

})