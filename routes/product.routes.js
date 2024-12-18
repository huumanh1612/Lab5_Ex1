const express = require("express");
const { Product } = require("../models");
const router = express.Router();

// Thêm Product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ action: "add", status: "success", Product: product });
  } catch (error) {
    res
      .status(400)
      .json({ action: "add", status: "error", message: error.message });
  }
});

// Lấy tất cả Products
router.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.json({ action: "view", status: "success", Products: products });
});

// Lấy Product theo ID
router.get("/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    res.json({ action: "view", status: "success", Product: product });
  } else {
    res
      .status(404)
      .json({ action: "view", status: "error", message: "Product not found" });
  }
});

// Cập nhật Product
router.put("/:id", async (req, res) => {
  const product = await Product.update(req.body, {
    where: { ProductId: req.params.id },
  });
  res.json({ action: "update", status: "success", Product: product });
});

// Xóa Product
router.delete("/:id", async (req, res) => {
  const result = await Product.destroy({
    where: { ProductId: req.params.id },
  });
  if (result) {
    res.json({
      action: "delete",
      status: "success",
      message: "Product deleted",
    });
  } else {
    res
      .status(404)
      .json({
        action: "delete",
        status: "error",
        message: "Product not found",
      });
  }
});

module.exports = router;
