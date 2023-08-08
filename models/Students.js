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
  isActive: { // Corregido de "active" a "isActive"
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  hasAccess: { // Nuevo campo para controlar el acceso
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Puedes ajustar el valor predeterminado según tus necesidades
  },


});

module.exports = Student;
