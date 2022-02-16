const mongoose = require("mongoose");

const connectDB = (url) => {
  // The four use... options are only needed for this since
  // Mongoose's current version does not require this
  mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
