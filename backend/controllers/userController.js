import User from '../models/User.js';

// Add movie to liked list
export const likeMovie = async (req, res) => {
  const { movieId } = req.body;
  console.log("movieId from request:", movieId);


  if (!movieId) return res.status(400).json({ msg: "Movie ID is required" });

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.likedMovies.includes(movieId)) {
      user.likedMovies.push(movieId);
      await user.save();
    }

    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (err) {
    console.error("Like Movie Error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove movie from liked list
export const unlikeMovie = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ msg: "Movie ID is required" });

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.likedMovies = user.likedMovies.filter(id => id.toString() !== movieId);
    await user.save();

    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (err) {
    console.error("Unlike Movie Error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add movie to wishlist
export const addToWishlist = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ msg: "Movie ID is required" });

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.wishlist.includes(movieId)) {
      user.wishlist.push(movieId);
      await user.save();
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("Add to Wishlist Error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Remove movie from wishlist
export const removeFromWishlist = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) return res.status(400).json({ msg: "Movie ID is required" });

  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id !== movieId);
    await user.save();

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error("Remove from Wishlist Error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get liked and wishlist movies for a user
export const getUserMovies = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({
      likedMovies: user.likedMovies,
      wishlist: user.wishlist
    });
  } catch (err) {
    console.error("Get User Movies Error:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};
