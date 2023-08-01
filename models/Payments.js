const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Payment = sequelize.define("payment", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    monto: {
        type: Sequelize.DECIMAL(10, 2), // Número decimal con 10 dígitos y 2 decimales
        allowNull: false
    },
    concepto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero_recibo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    metodo: {
        type: Sequelize.STRING,
        allowNull: false
    }


});



module.exports = Payment;