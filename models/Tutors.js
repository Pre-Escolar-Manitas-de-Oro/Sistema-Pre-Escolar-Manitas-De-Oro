const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Tutor = sequelize.define("tutors", {

    id: {

        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },


    name: {

        type: Sequelize.STRING,
        allowNull: false,

    },
    lastname: {

        type: Sequelize.STRING,
        allowNull: false,

    },

    cedula: {

        type: Sequelize.STRING,
        allowNull: false,

    },



});



module.exports = Tutor;