const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const SchoolYear = sequelize.define("schoolyear", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date2: {
        type: Sequelize.STRING,
        allowNull: false
    },

    dateunited: {
        type: Sequelize.STRING,
        allowNull: false

    }

});



module.exports = SchoolYear;