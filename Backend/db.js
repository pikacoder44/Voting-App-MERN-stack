const mongoose = require("mongoose");
require("dotenv").config();
// const mongoURL = process.env.MONGODB_LOCAL;  //(Local)
const mongoURL = process.env.MONGODB_URL; //(Online)
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ssl: true, // Force SSL
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const db = mongoose.connection;

// Export the database connection
module.exports = db;
