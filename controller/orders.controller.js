const mongoose = require("mongoose");
const Order = require("../models/orders.js");
const Course = require("../models/course.model.js");
const User = require("../models/users.model.js");
const asyncWrapper = require("../Middlewares/async_wrapper");
const AppError = require("../utils/app_error");

const createOrder = asyncWrapper(async (req, res, next) => {
  const { courseId, userId } = req.body;
  const course = await Course.findOne({ _id: courseId });
  const user = await Course.findOne({ _id: reqUser.userId });
  const order = await Order.create({
    user: user._id,
    course: course._id,
    price: course.price,
  });
  await order.save();
  res.jsend.success({
    order,
    user: { username: user.username, email: user.email },
  });
});

const acceptOrder = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;

  if (reqUSer.role === "admin") {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.order },
      { state: "success" }
    );
    const newOrder = Order.findOne({ _id: order._id }, { state: "success" });
    const user = await User.findOne(
      { _id: newOrder.user },
      { __v: false, password: false, role: false, _id: false }
    );
    const course = await Course.findOne(
      { _id: newOrder.course },
      { __v: false, description: false, _id: false }
    );

    res.jsend.success(newOrder, { user, course });
  } else {
    const error = AppError.create(
      "You Are Not Allowed To Active This Order",
      403,
      "fail"
    );
    return next(error);
  }
});

module.exports = {
  createOrder,
  acceptOrder,
};
