const express = require("express");
const router = express.Router();

const User = require("../models/user");

const { jwtAuthMiddleware, generateToken } = require("../jwt");

const checkAdmin = async () => {
  const response = await User.find({ role: "admin" });
  if (response.length == 1) {
    console.log("Admin found");
    return true;
  } else {
    console.log("Admin Not found");
    return false;
  }
};

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    // Admin signup
    if (req.body.role === "admin") {
      if (await checkAdmin()) {
        return res.status(403).json({ message: "Only one admin allowed" });
      }

      if (req.body.specialkey !== process.env.JWT_SECRET) {
        return res.status(403).json({ message: "Special key is invalid" });
      }

      // Create admin
      const newUser = new User(data);
      const response = await newUser.save();

      const payload = { id: response.id };
      const token = generateToken(payload);

      return res.status(200).json({ response, token });
    }

    // Voter signup (no special key needed)
    if (req.body.role === "voter") {
      const newUser = new User(data);
      const response = await newUser.save();

      const payload = { id: response.id };
      const token = generateToken(payload);

      return res.status(200).json({ response, token });
    }

    // Other roles not allowed
    return res.status(400).json({ message: "Invalid role" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login USer Route:
router.post("/login", async (req, res) => {
  try {
    // Extract CNIC & Password from body:
    const { cnic, password, role, specialkey } = req.body;

    // Find user by CNIC:
    const user = await User.findOne({ cnic: cnic });

    // If user doens't exist or password is not right:
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid CNIC or password" });
    }
    // Check admin Legitmacy:
    if (role === "admin") {
      if (specialkey !== process.env.JWT_SECRET) {
        return res
          .status(403)
          .json({ message: "Invalid Special Key for Admin" });
      }
    }
    // Generate Token:
    const payload = {
      id: user.id,
      role: user.role,
      isVoted: user.isVoted,
    };

    const token = generateToken(payload);

    // return token as response:
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile Route:
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user; // Because jwtAuthMiddleware get decoded value in user variable

    const userId = userData.id;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.log("Error: ", err);
    res.status(401).json({ error: "Internal Server Error" });
  }
});

// Update Method:
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Extract id from token
    const { currentPassword, newPassword } = req.body;

    // Find user by userId:
    const user = await User.findById(userId);

    // If password is not right:
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Password doesn't match" });
    }

    // Update pass, if correct:
    user.password = newPassword;
    await user.save();

    console.log("Password Updated");
    res.status(200).json({ message: "Password Updated Successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
