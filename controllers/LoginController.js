const Usuarios = require("../models/User");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
let isLoggedIn = false;

exports.getLogin = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        res.render("login/login", {
            pageTitle: "Login",
            loginActive: true,
        });
    } else {
        req.flash("errors", "Para proseguir debe cerrar la sesión actual")
        res.redirect("/");
    }
};


exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/login");
    });

};


exports.PostLogin = (req, res, next) => {

    const user = req.body.username;
    const contrasena = req.body.password;

    Usuarios.findOne({ where: { username: user } })
        .then(user => {
            if (!user) {
                req.flash("errors", "Usuario incorrecto");
                return res.redirect("/login");
            }

            if (user.estado === "0") {
                req.flash("errors", "Su cuenta no esta activa");
                return res.redirect("/login");
            }

            bcrypt.compare(contrasena, user.password).then(result => {
                if (result) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.userdata = user.dataValues;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect("/");
                    });
                }
                req.flash("errors", "Contraseña incorrecta");
                res.redirect("/login");
            }).catch(err => {
                console.log(err);
                req.flash("errors", "Ha ocurrido un error, contacte con el administrador" + err);
                return res.redirect("/login");
            });
        }).catch(err => {
            console.log(err);
            return res.redirect("/login");
        });
};