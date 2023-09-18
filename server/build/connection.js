"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('ingles', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Reemplaza con el puerto de tu servidor MySQL
});
module.exports = sequelize;
