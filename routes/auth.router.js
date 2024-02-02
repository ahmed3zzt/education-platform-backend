const express = require('express');
var router = express.Router();
const controller = require('../controller/auth.controller')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


router.post('/studentRegister',jsonParser,controller.registerStudent)
router.post('/login',jsonParser,controller.login)
router.post('/teacherRegister',jsonParser,controller.registerTeacher)



module.exports = router;