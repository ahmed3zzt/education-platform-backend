
const mongoose = require('mongoose')
const Category = require('../models/category.model')
const Course = require('../models/course.model')
const asyncWrapper = require('../Middlewares/async_wrapper')


const createCategory = asyncWrapper(async (req, res, next)=>{
    const category = await new Category(req.body)
    await category.save()
    res.status(201).jsend.success(category)
})

const AddCourse = asyncWrapper(async (req,res,next)=>{
    const newCourse = await new Course(req.body)
    await newCourse.save()
    res.status(201).jsend.success(newCourse)
})

module.exports = {
    createCategory,
    AddCourse
}