const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
    //match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["Web", "Mobile", "Network"],
    //lowercase: true, // will convert to lowercase
    trim: true
  },
  author: {
    type: String
  },
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
        // v - value
      },
      message: "A course should have at least on tag"
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    min: 10,
    max: 200,
    required: function() {
      // need to save context
      return this.isPublished; // only required if is published
    },
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  isPublished: Boolean
});

module.exports = mongoose.model("Course", courseSchema);
