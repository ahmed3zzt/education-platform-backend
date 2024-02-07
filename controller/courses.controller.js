const mongoose = require("mongoose");
const Category = require("../models/category.model");
const User = require("../models/users.model");
const Course = require("../models/course.model");
const asyncWrapper = require("../Middlewares/async_wrapper");
const AppError = require("../utils/app_error");

// const createCategory = asyncWrapper(async (req, res, next) => {
//   const category = await new Category(req.body);
//   await category.save();
//   res.status(201).jsend.success(category);
// });

const getAllCourses = asyncWrapper(async (req, res, next) => {
  const courses = await Course.find();
  const getCoursesWithAuthorAndCategoryName = async () => {
    const coursesWithAuthorAndCategoryName = new Set();
    for (const course of courses) {
      let teacherName = "";
      let categoryTitle = "";
      const author = await User.find({ _id: course.author });
      const category = await Category.find({ _id: course.category });
      if (author.length > 0 && category.length > 0) {
        teacherName = author[0].username;
        categoryTitle = category[0].title;
        coursesWithAuthorAndCategoryName.add({
          _id: course._id,
          title: course.title,
          price: course.price,
          description: course.description,
          image: course.image,
          author: teacherName,
          category: categoryTitle,
        });
      }
    }

    return Array.from(coursesWithAuthorAndCategoryName);
  };

  const coursesWithAuthorAndCategoryName =
    await getCoursesWithAuthorAndCategoryName();
  res.status(200).jsend.success(coursesWithAuthorAndCategoryName);
});
const AddCourse = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;
  if (reqUser.role === "teacher" || reqUser.role === "admin") {
    let { title, description, price, category, image } = req.body;
    if (image === undefined) {
      image = "https://placehold.co/600x400";
    }
    const categoryId = await Category.find({ title: category });
    const author = reqUser.user_id;
    const course = new Course({
      title,
      price,
      description,
      category: categoryId[0]._id,
      image,
      author,
    });
    await course.save();
    res.status(201).jsend.success(course);
  } else {
    const error = AppError.create("You Can`t Add New Course", 403);
    next(error);
  }
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;
  if (reqUser.role === "admin") {
    const { id } = req.query;
    const course = await Course.findByIdAndDelete(id);
    res.status(200).jsend.success(course);
  } else if (reqUser === "teacher") {
    const course = await Course.findById(id);
    if (course.author === reqUser.user_id) {
      const course = await Course.findByIdAndDelete(id);
      res.status(200).jsend.success(course);
    }
  } else {
    const error = AppError.create("You Can`t Delete This Course", 403);
    next(error);
  }
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;
  console.log(reqUser);
  const { id } = req.query;
  if (reqUser.role === "admin") {
    const course = await Course.findOneAndUpdate({ _id: id }, req.body);
    const updatedCourse = await Course.findOne({ _id: course._id });
    return res.status(200).jsend.success(updatedCourse);
  } else if (reqUser.role === "teacher") {
    const course = await Course.findOneAndUpdate(
      { _id: id, author: reqUser.user_id },
      req.body
    );
    const updatedCourse = await Course.findOne({ _id: course._id });
    return res.status(200).jsend.success(updatedCourse);
  } else {
    const error = AppError.create("You Can`t Update This Course", 403);
    return next(error);
  }
});

module.exports = {
  AddCourse,
  getAllCourses,
  deleteCourse,
  updateCourse,
};
