import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
});

// DELETE a user
router.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete user" });
  }
});

// GET stats
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    res.json({ usersCount });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch stats" });
  }
});

export default router;
