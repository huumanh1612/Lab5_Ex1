const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Tạo thư mục lưu trữ ảnh nếu chưa tồn tại
const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Cấu hình multer để lưu ảnh vào thư mục "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Đường dẫn thư mục lưu ảnh
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Endpoint 1: Nhận và lưu trữ ảnh
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No file uploaded" });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({
    status: "success",
    message: "Image uploaded successfully",
    filePath: filePath,
  });
});

// Endpoint 2: Hiển thị ảnh đã lưu
router.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ status: "error", message: "Image not found" });
  }
});

module.exports = router;
