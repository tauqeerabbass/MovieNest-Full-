import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  likedMovies: [{ type: String }],  // change from `likes` to `likedMovies`
  wishlist: [{ type: String }]      // change from `watchlist` to `wishlist`
});

export default mongoose.model("User", userSchema);
