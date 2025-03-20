const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const courseController = require("../controllers/courseController");

router.post("/:courseId/grades", auth, courseController.addGrade);
router.get("/:courseId/grades", auth, courseController.getGrades);

module.exports = router;
