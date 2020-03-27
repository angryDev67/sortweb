const express = require("express");
const Joi = require("joi");
const router = express.Router();
const User = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  console.log(process.env.SECRET);
  const token = user.generateAuthToken(); // secret key
  //res.json({ success: true, token, user });
  res.redirect("/admin/dashboard");
});

function validateUser(user) {
  const schema = {
    password: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(3)
      .required()
      .email()
  };

  return Joi.validate(user, schema);
}

module.exports = router;
