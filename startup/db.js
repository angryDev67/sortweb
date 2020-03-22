const logger = require("../logs/logger");
const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(
      "mongodb://bright:ttauq2hu@ds113702.mlab.com:13702/dang-that-delicious",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      logger.info("conntected to Mongo DB");
    });
};
