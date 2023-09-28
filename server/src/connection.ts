import { Sequelize } from "sequelize";



const sequelize = new Sequelize('ingles', 'root', '', {
  host: 'localhost', // Reemplaza con la dirección de tu servidor MySQL
  dialect: 'mysql', // Sequelize es compatible con varios dialectos de bases de datos, en este caso MySQL
  port: 3306, // Reemplaza con el puerto de tu servidor MySQL
});

module.exports = sequelize;
