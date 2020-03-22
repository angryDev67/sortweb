const express = require("express");
const joi = require("joi");
const router = express.Router();

router.post("/customers", (req, res) => {
  const schema = {
    name: joi
      .string()
      .min(3)
      .required(),
    password: joi
      .string()
      .min(5)
      .required()
  };
  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details);
    return;
  }

  const name = req.body.name;
  const password = req.body.password;
  const isGold = req.body.isGold;
  const phone = req.body.phone;

  const customer = {
    name,
    password,
    isGold,
    phone
  };
  res.send(customer);
});

module.exports = router;
