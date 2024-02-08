const Video = require("../models/video.model");
const asyncWrapper = require("../Middlewares/async_wrapper");
const AppError = require("../utils/app_error");
const addVideo = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;

  if (reqUser.role === "admin" || reqUser.role === "teacher") {
    const video = await new Video(req.body);
    await video.save();
    res.status(201).jsend.success(video);
  } else {
    const error = AppError.create("You Can`t Add New Course", 403);
    next(error);
  }
});

const deleteVideo = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;
  const { id } = req.query;
  if (reqUser.role === "admin" || reqUser.role === "teacher") {
    const video = await Video.findByIdAndDelete(id);
    res.jsend.success(video);
  } else {
    const error = AppError.create("You Can`t Add New Course", 403);
    next(error);
  }
});

const updateVideo = asyncWrapper(async (req, res, next) => {
  const reqUser = req.decoded;
  const { id } = req.query;
  if (reqUser.role === "admin" || reqUser.role === "teacher") {
    const video = await Video.findByIdAndUpdate(id, req.body);
    const newVideo = await Video.find({ _id: video._id });
    res.jsend.success(newVideo);
  } else {
    const error = AppError.create("You Can`t Add New Course", 403);
    next(error);
  }
});

const getVideo = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  res.jsend.success(video);
});

module.exports = {
    addVideo,
    deleteVideo,
    updateVideo,
    getVideo
}