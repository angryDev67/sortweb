const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("hm main page?");
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("loginPage");
});

module.exports = router;
