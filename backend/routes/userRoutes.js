import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ Get authenticated user (excluding password)
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Add movie to liked list
router.post("/like", verifyToken, async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ msg: "movieId is required" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.likedMovies.includes(movieId)) {
      user.likedMovies.push(movieId);
      await user.save();
    }

    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (err) {
    console.error("Error liking movie:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/user/like/:movieId

router.delete("/like/:movieId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");

    user.likedMovies = user.likedMovies.filter((id) => id !== movieId);
    await user.save();

    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ✅ Add movie to wishlist
router.post("/wishlist", verifyToken, async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) return res.status(400).json({ msg: "movieId is required" });

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.wishlist.includes(movieId)) {
      user.wishlist.push(movieId);
      await user.save();
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/user/watchlist/:movieId

router.delete("/wishlist/:movieId", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");

    user.wishlist = user.wishlist.filter((id) => id.toString() !== movieId);
    await user.save();

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// ✅ Get liked and wishlist movies
router.get("/movies", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({
      likedMovies: user.likedMovies,
      wishlist: user.wishlist,
    });
  } catch (err) {
    console.error("Error fetching user movies:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
