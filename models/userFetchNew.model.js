const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const UserFetchNew = sequelize.define("UserFetchNew", {
  UserId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  FullName: { type: DataTypes.STRING, allowNull: false },
  Username: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING, allowNull: false },
  Phone: { type: DataTypes.STRING },
  Website: { type: DataTypes.STRING },
  Street: { type: DataTypes.STRING },
  Suite: { type: DataTypes.STRING },
  City: { type: DataTypes.STRING },
  Zipcode: { type: DataTypes.STRING },
  Lat: { type: DataTypes.STRING },
  Lng: { type: DataTypes.STRING },
});

module.exports = UserFetchNew;
