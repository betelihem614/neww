const Course = require("../models/Course");

exports.addGrade = async (req, res) => {
  const { courseId, studentId, grade } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    if (course.teacher.toString() !== req.user.id)
      return res.status(403).json({ msg: "Not authorized" });

    course.grades.push({ student: studentId, grade });
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getGrades = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "grades.student",
      "name"
    );
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json(course.grades);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id }).populate(
      "teacher",
      "name"
    );
    res.json(courses);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find()
    .populate("teacher", "name")
    .populate("grades.student", "name");
  res.json(courses);
};
