const express = require("express");
var router = express.Router();
const controller = require("../controller/auth.controller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const authValidation = require('../Middlewares/Auth-validation')
const { body, check } = require("express-validator");

router.post(
  "/studentRegister",
  jsonParser,
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username can`t be empty")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters."),
    body("email").trim().notEmpty().isEmail().withMessage("Invalid email."),
    check("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one digit")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],

  controller.registerStudent
);
router.post(
  "/login",
  jsonParser,
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be valid"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],


  controller.login
);
router.post(
  "/teacherRegister",
  jsonParser,
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username can`t be empty")
      .isLength({ min: 3, max: 20 })
      .withMessage("Username must be between 3 and 20 characters."),
    body("email").trim().notEmpty().isEmail().withMessage("Invalid email."),
    check("password")
      .exists()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one digit")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],

  controller.registerTeacher
);



router.post('/bannedAccount',authValidation,controller.bannedAccount);
router.post('/activateUser/:id',authValidation,controller.activateUser)
router.post('/reset-password/:token',jsonParser,controller.resetPassword)
module.exports = router;
