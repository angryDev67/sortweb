const logger = require("../logs/logger");

module.exports = function(err, req, res, next) {
  // log the exception
  logger.error(err.message, err);
  // error
  // warn
  // info
  // verbose
  // debug
  // silly
  res.status(500).json({ success: false, message: "Something failed" });
};
