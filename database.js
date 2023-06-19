const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://fahhod:coded-123@cluster0.6styozt.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
