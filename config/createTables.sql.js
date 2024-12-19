const { sequelize } = require("./db.config");

const createTables = async () => {
  try {
    // Tạo bảng User
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS User (
        UserId INT AUTO_INCREMENT PRIMARY KEY,
        FullName VARCHAR(100) NOT NULL,
        Address VARCHAR(255),
        RegistrationDate DATE DEFAULT CURRENT_DATE
      );
    `);

    // Tạo bảng Product
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS Product (
        ProductId INT AUTO_INCREMENT PRIMARY KEY,
        ProductName VARCHAR(100) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL,
        ManufacturingDate DATE
      );
    `);

    // Tạo bảng ShoppingCart
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS ShoppingCart (
        CartId INT AUTO_INCREMENT PRIMARY KEY,
        UserId INT NOT NULL,
        ProductId INT NOT NULL,
        Quantity INT DEFAULT 1,
        FOREIGN KEY (UserId) REFERENCES User(UserId) ON DELETE CASCADE,
        FOREIGN KEY (ProductId) REFERENCES Product(ProductId) ON DELETE CASCADE
      );
    `);

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error.message);
  }
};

module.exports = createTables;
