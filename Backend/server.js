const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const bodyParser = require("body-parser");
const Candidate = require("./models/Candidate");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import the router files:
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidatesRoutes");

// Use routes:
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.get("/candidate", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    console.log("Data Found");
    res.status(200).json(candidates);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: " Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Command : npm run dev (To Start the Backend Server)
