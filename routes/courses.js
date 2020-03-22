const express = require("express");
const router = express.Router();
const Course = require("../models/courses");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

router.get("/courses", [auth, admin], (req, res) => {
  res.json([{ name: "Course 1" }, { name: "Course 2" }]);
});

router.get("/getcourses", async (req, res, next) => {
  const courses = await Course.find({});
  //throw new Error("Could not get all courses");
  res.json({ success: true, courses });
});

router.get("/", (req, res) => {
  res.render("index", {
    title: "My title",
    message: "my message"
  });
});

router.post("/course", auth, async (req, res) => {
  const course = new Course({
    name: "Svelte js course",
    author: "Vlad",
    category: "Web",
    tags: ["Web", "js"],
    isPublished: false,
    price: 12.9
  });

  try {
    const courseResult = await course.save();

    if (!courseResult) {
      return res.status(500).json({
        success: false,
        message: "cant create a doc in db"
      });
    }
    res.json({
      success: true,
      course: courseResult
    });
  } catch (e) {
    // console.log(e.errors);
    // console.log(e.message);
    for (field in e.errors) {
      console.log(e.errors[field]["message"]);
    }
  }
});

router.get("/allcourses", async (req, res) => {
  //eq - equal
  // ne not equal
  // gt - greter than
  // gte greater than or equal
  //lt less than
  //lte less than aor equal
  //in
  //nin not in
  //Course.find({ price: { $gt: 10, $lte: 20 } })
  //Course.find({ price: { $in: [10, 20, 30] } })

  // or
  // and
  const courses = await Course.find()
    .or([{ author: "Mosh" }, { isPublished: true }])
    .and([{ author: "Mosh" }, { isPublished: true }])
    // Starts with Mosh
    // .find({ author: /^Mosh/})
    // ^ - starts with smth
    // ends with
    // $ - end of a string
    // i - case insensitive

    // contains the word Mosh
    // .find({ author: /.*Mosh.*/})
    //.find({ author: /Hamenadi$/i })
    //.skip((pageNumber - 1) * pageSize) pagination
    //.limit(pageSize)
    .limit(3)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count(); // return count of docs
  if (!courses) {
    return res.status(500).json({
      success: false,
      message: "cant create a doc in db"
    });
  }

  res.json({
    success: true,
    courses: courses
  });
});

module.exports = router;
