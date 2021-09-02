const mongoose = require("mongoose");
const connectDB= async () => {
  try {
    await mongoose.connect(process.env['DB_CONNECTION_STRING'], {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected To Database...");
  } catch (err) {
    console.error("Unable To Connect \n Reason:" + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
