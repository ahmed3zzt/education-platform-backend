const express = require('express');
var router = express.Router();
const controller = require('../controller/courses.controller')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
router.post('/category',jsonParser,controller.createCategory);

router.route('/')
    .post(jsonParser,controller.AddCourse)

module.exports = router;