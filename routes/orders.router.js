const express = express();
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const authValidation = require("../Middlewares/Auth-validation");
const controller = require('../controller/orders.controller.js');

router.route('/')
    .post(jsonParser,authValidation,controller.createOrder)

router.route('/orders/:order')
    .post(jsonParser,authValidation,controller.acceptOrder)