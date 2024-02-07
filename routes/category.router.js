const express = require("express");
var router = express.Router();
const controller = require("../controller/category.controller");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const authValidation = require("../Middlewares/Auth-validation");

router.post("/", jsonParser, controller.createCategory);
router.get("/", controller.getAllCategories);

module.exports = router