const express = require("express");
const { User } = require("../models");
const router = express.Router();

// Thêm User
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json({ action: "add", status: "success", User: user });
});

// Lấy tất cả Users
router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json({ action: "view", status: "success", Users: users });
});

module.exports = router;
