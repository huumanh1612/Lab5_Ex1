const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Lab5", "root", "M123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
