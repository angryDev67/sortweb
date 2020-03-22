const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

module.exports = function(app) {
  console.log("App name:" + config.get("name"));
  console.log("Mail server:" + config.get("mail.host"));

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("morgan enabled");
  }
};
