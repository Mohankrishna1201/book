const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect("mongodb+srv://admin:AJj6aEVKqGrMs70u@cluster0.zht4cn6.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = connect;
