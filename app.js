require('dotenv').config()

var express = require('express');
var indexRouter = require('./routes/index');

var app = express();


// Init routes
app.use('/', indexRouter);


app.listen(process.env.PORT,()=>{
  console.log('Server running on port '+ process.env.PORT);
});


module.exports = app;
