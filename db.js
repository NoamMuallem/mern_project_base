const mongoose = require("mongoose");
require("dotenv").config();

const dbInit = () => {
  const dbURI = `${process.env.MONGO_API}/${process.env.DB_NAME}`;
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("mongodb is connected...");
    })
    .catch((e) => {
      console.log(
        "could not connect to mongodb, this is the error provided: ",
        e
      );
    });
};

module.exports = dbInit;
