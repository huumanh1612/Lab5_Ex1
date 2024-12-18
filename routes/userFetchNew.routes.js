const express = require("express");
const axios = require("axios");
const UserFetchNew = require("../models/userFetchNew.model");
const router = express.Router();

// Endpoint: Fetch data và lưu vào database
router.get("/fetch-users-new", async (req, res) => {
  try {
    // Fetch dữ liệu từ API
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users = response.data;

    // Map dữ liệu để khớp với model
    const mappedUsers = users.map((user) => ({
      FullName: user.name,
      Username: user.username,
      Email: user.email,
      Phone: user.phone,
      Website: user.website,
      Street: user.address.street,
      Suite: user.address.suite,
      City: user.address.city,
      Zipcode: user.address.zipcode,
      Lat: user.address.geo.lat,
      Lng: user.address.geo.lng,
    }));

    // Lưu vào database
    await UserFetchNew.bulkCreate(mappedUsers, {
      updateOnDuplicate: ["Email"],
    });

    res.json({
      status: "success",
      message: "New users fetched and saved successfully!",
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch users." });
  }
});

module.exports = router;
