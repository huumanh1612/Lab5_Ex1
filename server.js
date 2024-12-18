const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { sequelize } = require("./models");

// Import routes cũ
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const emailRoutes = require("./routes/email.routes");
const imageRoutes = require("./routes/image.routes");
const userFetchNewRoutes = require("./routes/userFetchNew.routes");

const app = express();
app.use(bodyParser.json());

// Cổng sẽ dùng biến môi trường PORT hoặc mặc định là 3001
const PORT = process.env.PORT || 3001;

// Routes cũ
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", emailRoutes);
app.use("/api", imageRoutes);
app.use("/api", userFetchNewRoutes);

// Static folder để hiển thị ảnh
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Khởi tạo database và chạy server
sequelize.sync().then(() => {
  console.log("Database synchronized!");
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
});
