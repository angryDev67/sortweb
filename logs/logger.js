const winston = require("winston");

require("winston-mongodb");

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" }
});
logger.add(
  new winston.transports.MongoDB({
    db: "mongodb://bright:ttauq2hu@ds113702.mlab.com:13702/dang-that-delicious"
  })
);
logger.add(new winston.transports.File({ filename: "logfile.log" }));
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = logger;
