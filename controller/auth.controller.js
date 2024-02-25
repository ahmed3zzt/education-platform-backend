const asyncWraper = require("../Middlewares/async_wrapper");
const User = require("../models/users.model");
const BannedUser = require("../models/banned_user_model");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/app_error");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const registerStudent = asyncWraper(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array();
    return next(AppError.create(errors, 400, "fail"));
  }
  const { username, email, password } = req.body;

  const isBanned = await BannedUser.findOne({ email: email });
  const testEmail = User.findOne({ email: email });
  if (!testEmail) {
    const error = AppError.create("This Email is already in use", 401, "fial");
    return next(error);
  }
  if (isBanned) {
    const error = AppError.create("This Email is Banned", 401, "fial");
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: "student",
  });
  await user.save();
  const token = jwt.sign(
    { user_id: user._id, role: user.role, isActive: user.isActive },
    process.env.SECRET_JWT_KEY
  );
  res.status(201).jsend.success({
    message: "User Created Successfully",
    token: token,
  });
});

const login = asyncWraper(async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array();
    return next(AppError.create(errors, 400, "fail"));
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = AppError.create("Email Or Password Are Wrong", 401, "fial");
    return next(error);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = AppError.create("Email Or Password Are Wrong", 401, "fial");
    return next(error);
  }
  const token = jwt.sign(
    { user_id: user._id, role: user.role, isActive: user.isActive },
    process.env.SECRET_JWT_KEY
  );
  res.status(200).jsend.success({
    message: "User Logged In Successfully",
    token: token,
  });
});

const registerTeacher = asyncWraper(async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array();
    return next(AppError.create(errors, 400, "fail"));
  }

  const { username, email, password } = req.body;
  const isBanned = await BannedUser.findOne({ email: email });
  const testEmail = User.findOne({ email: email });
  if (!testEmail) {
    const error = AppError.create("This Email is already in use", 401, "fial");
    return next(error);
  }
  if (isBanned) {
    const error = AppError.create("This Email is Banned", 401, "fial");
    return next(error);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: "teacher",
  });
  await user.save();
  const token = jwt.sign(
    { user_id: user._id, role: user.role, isActive: user.isActive },
    process.env.SECRET_JWT_KEY
  );

  res.status(201).jsend.success({
    message: "User Created Successfully",
    token: token,
  });
});

const bannedAccount = asyncWraper(async (req, res, body) => {
  const { id } = req.query;
  const user = req.decoded;
  if (user.role === "admin") {
    const bannedUser = await User.findByIdAndDelete(id);
    const newBannedUser = new BannedUser({ email: bannedUser.email });
    await newBannedUser.save();
    res.jsend.success("Banned Succefully");
  } else {
    res.jsend.fail("You are not admin");
  }
});

const activateUser = asyncWraper(async (req, res, next) => {
  const reqUser = req.decoded;
  if (reqUser.role === 'admin') {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isActive: true
    })
    const newUser = await User.findOne({ _id: user._id }, { '__v': false, "password": false })
    res.jsend.success(newUser)
  }
})

const resetPassword = asyncWraper(async (req, res, next) => {
  const token = req.params.token
  const user = jwt.verify(token, process.env.SECRET_JWT_KEY, (err, decoded) => {
    if (err) {
      return err
    }
    return decoded
  })
  console.log(req.body)
  const { password } = req.body
  const hashedPass = bcrypt.hashSync(password, 10)
  await User.findByIdAndUpdate(user.user_id, { password: hashedPass })
  res.jsend.success("Done")
})
module.exports = {
  registerStudent,
  login,
  registerTeacher,
  bannedAccount,
  activateUser,
  resetPassword,
};
