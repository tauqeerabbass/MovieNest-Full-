import express from "express";
import Comment from "../models/Comment.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST a new comment
router.post("/", verifyToken, async (req, res) => {
  console.log("📥 Incoming comment request...");
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  console.log("Decoded user from token:", req.user);

  try {
    const { movieId, text } = req.body;

    if (!movieId || !text) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const newComment = new Comment({
      movieId,
      userId: req.user.id,
      username: req.user.name || "Anonymous",
      text,
    });

    const saved = await newComment.save();
    console.log("✔️ Comment saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error posting comment:", err.message);
    res.status(500).json({ msg: "Failed to post comment", error: err.message });
  }
});


// GET all comments for a movie
router.get("/:movieId", async (req, res) => {
  try {
    const comments = await Comment.find({ movieId: req.params.movieId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch comments" });
  }
});

export default router;
