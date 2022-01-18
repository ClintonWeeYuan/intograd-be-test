var createError = require("http-errors");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var mentorRouter = require("./routes/mentor");
var menteeRouter = require("./routes/mentee");
var matchmakeRouter = require("./routes/match-making");
var sendEmailRouter = require("./routes/sendEmail");
var mongoose = require("mongoose"); // for mongodb
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/mentor", mentorRouter);
app.use("/api/mentee", menteeRouter);
app.use("/api/matchmake", matchmakeRouter);
app.use("/api/sendEmail", sendEmailRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//Check to see if its a test. If its a test, no connection will be made to the actual mongoose server. The connection will be done via Mongodb Memory Server in testSuite.js

if (process.env.NODE_ENV === "test") {
  console.log("This is just a test, use Mongo Memory Server");
} else {
  mongoose.connect(process.env.MONGDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    writeConcern: "majority",
  });
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
