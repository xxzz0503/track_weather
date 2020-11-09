const MONGOOSE = require("mongoose");

const connection = () => {
  const mongoUri =
    "mongodb+srv://admin:admin@cluster0.wd0kh.mongodb.net/weather?retryWrites=true&w=majority";

  MONGOOSE.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  MONGOOSE.connection.on("connected", () => {
    console.log("Connect to mongo instance");
  });
  MONGOOSE.connection.on("error", (e) => {
    console.error("Error connecting to mongo", e);
  });
  return MONGOOSE;
};

module.exports = { connection };
