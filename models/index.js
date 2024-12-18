const sequelize = require("../config/db.config");
const User = require("./user.model");
const Product = require("./product.model");
const ShoppingCart = require("./cart.model");

// Định nghĩa quan hệ
User.hasMany(ShoppingCart, { foreignKey: "UserId" });
Product.hasMany(ShoppingCart, { foreignKey: "ProductId" });
ShoppingCart.belongsTo(User, { foreignKey: "UserId" });
ShoppingCart.belongsTo(Product, { foreignKey: "ProductId" });

module.exports = {
  sequelize,
  User,
  Product,
  ShoppingCart,
};
