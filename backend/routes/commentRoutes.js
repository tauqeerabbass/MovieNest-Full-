// import express from 'express';
// import { verifyToken } from '../middlewares/authMiddleware.js';
// import { addComment, getComments } from '../controllers/commentController.js';

// const router = express.Router();

// // Public: fetch all comments for a movie
// router.get('/:movieId', getComments);

// // Protected: add a comment
// router.post('/:movieId', verifyToken, addComment);

// export default router;
// This code defines routes for adding and fetching comments on movies.
// The `addComment` route is protected, meaning only authenticated users can add comments. The `getComments` route is public and allows anyone to fetch comments for a specific movie.

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
      username: req.user.name || "Anonymous", // fallback
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
