const jwt = require("jsonwebtoken");

// Make a function:

const jwtAuthMiddleware = (req, res, next) => {
  // First check request headers has authorization or not:
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  // Extract JWT Token from Request Header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify JWT Token:
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Add user info to the request object:
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid Token" });
  }
};

// Function to generate TOken:
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
