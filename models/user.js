const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  isAdmin: {
    type: Boolean
  },
  roles: [],
  operations: [
    {
      deleteCourse: Boolean,
      postCourses: Boolean
    }
  ]
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "secretkey!"
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
