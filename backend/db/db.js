const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.error("Db connection failed");
    process.exit(1);
  }
};
module.exports = connectDB;
