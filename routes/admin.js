const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/dashboard", [auth, admin], (req, res) => {
  console.log("hm admin page?");
  res.render("admin/dashboard");
});

module.exports = router;
