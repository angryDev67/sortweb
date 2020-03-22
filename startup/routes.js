const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const error = require("../middleware/error");

const courseRoutes = require("../routes/courses");
const userRoutes = require("../routes/user");
const customerRoutes = require("../routes/customers");
const authRoutes = require("../routes/auth");

module.exports = function(app) {
  app.set("view engine", "pug");
  app.set("views", "./views"); // default route for views

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static("public"));
  app.use(helmet());

  // routes
  app.use("/api", courseRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api", customerRoutes);

  // exeption middleware
  // needs to be at the end
  app.use(error);

  // models
  app.use(require("../models/user"));
  app.use(require("../models/courses"));
  app.use(require("../models/customers"));
};
