const express = require("express");
const { ShoppingCart, User, Product } = require("../models");
const router = express.Router();

// Thêm vào ShoppingCart
router.post("/", async (req, res) => {
  try {
    const cart = await ShoppingCart.create(req.body);
    res.json({ action: "add", status: "success", ShoppingCart: cart });
  } catch (error) {
    res
      .status(400)
      .json({ action: "add", status: "error", message: error.message });
  }
});

// Lấy tất cả ShoppingCart (cùng User và Product)
router.get("/", async (req, res) => {
  const carts = await ShoppingCart.findAll({
    include: [User, Product],
  });
  res.json({ action: "view", status: "success", ShoppingCarts: carts });
});

// Lấy giỏ hàng theo ID người dùng
router.get("/user/:id", async (req, res) => {
  const carts = await ShoppingCart.findAll({
    where: { UserId: req.params.id },
    include: [Product],
  });
  res.json({ action: "view", status: "success", ShoppingCarts: carts });
});

// Cập nhật số lượng trong giỏ hàng
router.put("/:id", async (req, res) => {
  const cart = await ShoppingCart.update(req.body, {
    where: { CartId: req.params.id },
  });
  res.json({ action: "update", status: "success", ShoppingCart: cart });
});

// Xóa mục trong giỏ hàng
router.delete("/:id", async (req, res) => {
  const result = await ShoppingCart.destroy({
    where: { CartId: req.params.id },
  });
  if (result) {
    res.json({
      action: "delete",
      status: "success",
      message: "Item removed from cart",
    });
  } else {
    res
      .status(404)
      .json({ action: "delete", status: "error", message: "Item not found" });
  }
});

module.exports = router;
