const Sequelize = require("sequelize");
const sequelize = require('../util/database');

const Months = sequelize.define("months", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    month: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});

module.exports = Months;