require("express-async-errors");
const express = require("express");

const morgan = require("morgan");

const Fawn = require("fawn");
const logger = require("./logs/logger");

// Object id
// 12 btes
// 4 bytes: timestamp - we can ge data out of id
// 3 bytws machine identifier
// 2 bytes process identified
// 3 bytes : counter
// knowing it we can validate obect ids
// maching with our machine
// id.getTimestamp() - get date
//const isValid = mongoose.Types.ObjectId.isValid('2232')

// transactions library
//Fawn.init(mongoose);

// try {
//   new Fawn.Task()
//     .save("rentals", rental)
//     .update(
//       "movies", // case sensitive with s
//       { _id: movie._id },
//       {
//         $inc: {
//           numberInStock: -1
//         }
//       }
//     )
//     .run();
// } catch (e) {}

// TERMINATE THE WHOLE APP
// IF WE DONT DEFINED IMPORTANT VALUES
// SUCH AS PRIVATE KEYS OR ENV VARIABLES
// if(!process.env.secret) {
//   process.exit(1)
// }

const app = express();
const PORT = 443;

// handle super exceptions
// which will terminate process
// work with sync code only
process.on("uncaughtException", function(e) {
  logger.error(e.message, e);
  process.exit(1);
});

// how to deal with unhandled promise rejections
process.on("unhandledRejection", function(e) {
  logger.error(e.message, e);
  //process might be at unclean state
  // and must be restarted
  process.exit(1);
});

// const p = Promise.reject(new Error("Omg!!!"));

// p.then(() => console.log("done"));

// load configs
require("./startup/config")(app);
// mongoose startup
require("./startup/db")();
// load all routes here
require("./startup/routes")(app);

app.listen(PORT, () => {
  console.log("server is running on port 80");
});
