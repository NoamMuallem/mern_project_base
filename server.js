//standart imports
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

//importing env conss
require("dotenv").config();

//creatinf express application
const app = express();

//middelwre setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("client/build"));

//route for testing
app.get("/env-test", (req, res) => {
  res.status(200).send(process.env.ENV_MSG);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("lisening on port " + process.env.PORT);
});
