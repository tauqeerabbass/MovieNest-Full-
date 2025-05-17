import Comment from '../models/Comment.js';

// POST /api/comments/:movieId
export const addComment = async (req, res) => {
  const { movieId } = req.params;
  const { text }    = req.body;

  if (!text?.trim()) {
    return res.status(400).json({ msg: 'Comment text is required' });
  }

  try {
    const comment = new Comment({
      userId:  req.user.id,
      movieId,
      text
    });
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};

// GET /api/comments/:movieId
export const getComments = async (req, res) => {
  const { movieId } = req.params;

  try {
    const comments = await Comment
      .find({ movieId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');  // include commenter’s name

    res.json(comments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
};
