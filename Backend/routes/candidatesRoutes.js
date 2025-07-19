const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Candidate = require("../models/Candidate");

const { jwtAuthMiddleware, generateToken } = require("../jwt");

// Check admin:
const checkAdminRole = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

// Post route to add a candidate
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user doesn't have admin role" });

    const data = req.body; // Assuming req.body contains the new Candidate data

    // Create a new Candidate document using Mongoose model
    const newCandidate = new Candidate(data);

    // Save the new Candidate document to the database
    const response = await newCandidate.save();
    console.log("Data Saved");

    res.status(200).json({ response: response });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Method:
router.put("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user doesn't have admin role" });

    const candidateId = req.params.candidateId;
    const updatedCandidateData = req.body;
    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updatedCandidateData,
      {
        new: true, // Gives you updated document (in variable)
        runValidators: true, // Runs Validation checks to ensure data is given correctly
      }
    );

    if (!response) {
      res.status(403).json({ error: "Candidate not found!" });
    }
    console.log("Candidate Data Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete method:

router.delete("/:candidateId", jwtAuthMiddleware, async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user doesn't have admin role" });

    const id = req.params.candidateId;
    const response = await Candidate.findByIdAndDelete({ _id: id });

    if (!response)
      return res.status(404).json({ error: "Candidate Not Found" });

    console.log("Candidate Deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Vote Casting:
router.post("/vote/:candidateId", jwtAuthMiddleware, async (req, res) => {
  // No admin can vote
  // One user can only vote once

  candidateId = req.params.candidateId;
  userId = req.user.id;
  try {
    // Find Candidate document by id:
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      res.status(404).json({ error: "Candidate Not Found" });
    }

    // Find user doc by user id:

    const user = await User.findById(userId);

    // Check if user is in db:
    if (!user) res.status(404).json({ error: "User Not Found" });

    // Admin check:
    if (user.role === "admin")
      return res.status(403).json({ error: "Admin can't vote" });

    // Check if user voted or not:
    if (user.isVoted) return res.status(400).json({ error: "Already voted" });

    // Update Candidate document to record the vote:
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // Update user document:
    user.isVoted = true;
    await user.save();

    res.status(200).json({ message: "Vote Casted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Internal server error" });
  }
});

// Vote Count:
router.get("/vote/count", async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });

    // Map the candidates to only return their name and vote Count:
    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Internal server error" });
  }
});

// List of Candidates:
router.get("/candidates", async (req, res) => {
  try {
    const candidateData = await Candidate.find().sort({ name: "asc" });

    const list = candidateData.map((data) => {
      return {
        name: data.name,
        party: data.party,
      };
    });
    return res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Internal server error" });
  }
});

module.exports = router;
