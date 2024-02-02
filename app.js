require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jsend = require("jsend");
const indexRouter = require("./routes/index");
const coursesRouter = require("./routes/courses.router");
const authRouter = require("./routes/auth.router");

const app = express();

// Jsend Middelwares
app.use(jsend.middleware);
// Init routes
app.use("/", indexRouter);
app.use("/courses", coursesRouter);
app.use("/auth", authRouter);


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });


  // Error Handles
  app.all("*", (req, res) => {
    res.status(404).jsend.error({ message: "Not Found Url", code: 404 });
  });
  
  app.use((err, req, res, next) => {
    if (err.statusText === "fail") {
      return res
        .status(err.statusCode || 404)
        .jsend.fail(err.message);
    } else {
      res
        .status(err.StatusCode || 500)
        .jsend.error({ code: err.StatusCode || 500, message: err.message });
    }
  });
module.exports = app;
