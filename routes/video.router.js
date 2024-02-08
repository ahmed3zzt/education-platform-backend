const express = require("express");
var router = express.Router();
const controller = require("../controller/video.controller.js");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const authValidation = require("../Middlewares/Auth-validation");

router.route('/')
    .post(jsonParser,authValidation,controller.addVideo)
    .patch(jsonParser,authValidation,controller.updateVideo)
    .delete(jsonParser,authValidation,controller.deleteVideo)

router.get('/:id',controller.getVideo)

module.exports = router