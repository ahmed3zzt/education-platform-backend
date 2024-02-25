const express = require("express");
var router = express.Router();
const controller = require("../controller/courses.controller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const authValidation = require("../Middlewares/Auth-validation");


router
  .route("/")
  .get(controller.getAllCourses)
  .post(jsonParser, authValidation, controller.AddCourse)
  .delete(authValidation,controller.deleteCourse)
  .patch(jsonParser, authValidation ,controller.updateCourse);

router.get('/author/:authorID',controller.getAllCoursesByAuthorID)
router.get('/category/:categoryId',controller.getAllCoursesByCategory)
router.get("/:courseId",controller.getCourse)
module.exports = router;
