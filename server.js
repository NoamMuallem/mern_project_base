//standart imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dbInit = require("./db");

//importing env conss
require("dotenv").config();

//creatinf express application
const app = express();

//middelwre setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("client/build"));

//serve static react-build files
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//error handaling for the app:
//the function if no route was activated activate this function:
function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

//error handaling, if you got here, handale sending error to user
function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

dbInit();

//listen on this port
app.listen(process.env.PORT, () => {
  console.log("lisening on port " + process.env.PORT);
});
