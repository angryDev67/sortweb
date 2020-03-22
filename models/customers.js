const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  isGold: {
    type: Boolean
  },
  name: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = mongoose.model("Customer", customerSchema);
