const mongoose = require("mongoose");
const keys = require("./keys");

mongoose
  .connect(keys.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("database connected"))
  .catch(error => {
    // console.log(error);

    // console.log("error in database");
    throw new Error("Database Disconnected");
  });

mongoose.set("useCreateIndex", true);
