const mongoose = require("mongoose");
const Category = require("../models/category.model");
const asyncWrapper = require("../Middlewares/async_wrapper");
const AppError = require("../utils/app_error");

const createCategory = asyncWrapper(async (req, res, next) => {
    const category = await new Category(req.body);
    await category.save();
    res.status(201).jsend.success(category);
  });

const getAllCategories = asyncWrapper(async (req,res,next)=>{
    const categories= await Category.find()
    res.jsend.success(categories)
});

module.exports = {
  createCategory,
  getAllCategories
}