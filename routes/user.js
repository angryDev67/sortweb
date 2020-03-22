const express = require("express");
const Joi = require("joi");
const router = express.Router();
const User = require("../models/user");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ success: false, message: "User already registered" });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const normalizeUser = _.pick(user, ["_id", "name", "email"]);
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).json({ success: true, normalizeUser });
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
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
