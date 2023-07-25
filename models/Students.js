const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Student = sequelize.define("students", {

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

    birthdate: {

        type: Sequelize.DATEONLY,
        allowNull: false,

    },

    active: {

        type: Sequelize.BOOLEAN,
        allowNull: true,
    },
});



module.exports = Student;