const asyncWraper = require('../Middlewares/async_wrapper');
const User = require('../models/users.model')
const bcrypt = require('bcryptjs');
const AppError = require('../utils/app_error')
var jwt = require('jsonwebtoken');


const registerStudent = asyncWraper(async (req,res,next)=>{
    const { username , email , password} = req.body;
    const testEmail = User.findOne({ email: email})
    if(!testEmail){
        const error = AppError.create('This Email is already in use',401,'fial')
        return next(error)
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await new User({
        username,
        email,
        password: hashedPassword,
        role:'student'
    })
    await user.save()
    const token = jwt.sign({user_id:user._id,role:user.role}, process.env.SECRET_JWT_KEY);

    res.status(201).jsend.success({
        message: 'User Created Successfully',
        token: token
    })
})


const login = asyncWraper( async (req, res,next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) {
        const error = AppError.create('Email Or Password Are Wrong',401,'fial')
        return next(error)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        const error = AppError.create('Email Or Password Are Wrong',401,'fial')
        return next(error)
    }
    const token = jwt.sign({user_id:user._id,role:user.role}, process.env.SECRET_JWT_KEY);
    res.status(200).jsend.success({
        message: 'User Logged In Successfully',
        token: token
    })
})

const registerTeacher = asyncWraper(async (req, res,next) => {
    const { username, email, password} = req.body;
    const testEmail = User.findOne({ email: email})
    if(!testEmail){
        const error = AppError.create('This Email is already in use',401,'fial')
        return next(error)
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await new User({
        username,
        email,
        password: hashedPassword,
        role: 'teacher'
    })
    await user.save()
    const token = jwt.sign({user_id:user._id,role:user.role}, process.env.SECRET_JWT_KEY);

    res.status(201).jsend.success({
        message: 'User Created Successfully',
        token: token
    })
})


module.exports = {
    registerStudent,
    login,
    registerTeacher
}