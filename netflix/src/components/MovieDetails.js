import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constans";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem("token");
  const name = useSelector((state) => state.user?.user?.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(removeUser()); // clear user from Redux
    localStorage.removeItem("token"); // clear token from localStorage
    navigate("/"); // redirect to login page
  };

  const fetchMovieDetails = async () => {
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const json = await movieData.json();
    setMovie(json);
  };

  const fetchMovieTrailer = async () => {
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await movieData.json();

    const filteredTrailer = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredTrailer.length
      ? filteredTrailer[0]
      : json.results[0];
    setTrailerKey(trailer?.key);
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${movieId}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    console.log("Token before posting comment:", token);
    console.log("Posting comment with", { movieId, text: comment });


    try {
      const res = await fetch(`http://localhost:5000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId, text: comment }), // ✅ Confirm this is defined
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        setComments((prev) => [data, ...prev]);
        setComment("");
      }
    } catch (err) {
      console.error("❌ Failed to post comment:", err);
    }
  };

  const handleLike = async (movie) => {
    const res = await fetch(`http://localhost:5000/api/user/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    });
    const data = await res.json();
    console.log("Updated Likes:", data);
  };

  const handleWatchlist = async (movie) => {
    const res = await fetch(`http://localhost:5000/api/user/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    });
    const data = await res.json();
    console.log("Updated Watchlist:", data);
  };

  const handleUnlike = async (movie) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/like/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("Updated Likes after unlike:", data);
    } catch (err) {
      console.error("Error unliking movie", err);
    }
  };

  const handleRemoveFromWatchlist = async (movie) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/user/wishlist/${movie.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("Updated Watchlist after removal:", data);
    } catch (err) {
      console.error("Error removing from watchlist", err);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieTrailer();
    fetchComments();
  }, [movieId]);

  if (!movie) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="text-white bg-black min-h-screen p-8">
      {/* Trailer */}
      {trailerKey && (
        <div className="mb-8 w-full mx-auto h-[480px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}`}
            title="YouTube trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Title & Overview */}
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <p className="max-w-3xl text-lg mb-6">{movie.overview}</p>

      {/* Buttons */}
      <div className="flex items-center gap-4 mb-8">
        <button
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white"
          onClick={() => handleLike(movie)}
        >
          ❤️ Like
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white"
          onClick={() => handleWatchlist(movie)}
        >
          ➕ Add to Wishlist
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white"
          onClick={() => handleUnlike(movie)}
        >
          💔 Unlike
        </button>
        <button
          className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg text-white"
          onClick={() => handleRemoveFromWatchlist(movie)}
        >
          ➖ Remove from Wishlist
        </button>
      </div>

      {/* Comment Section */}
      <div className="mt-10 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full h-24 p-4 rounded-md text-black resize-none"
        />

        <button
          onClick={handlePostComment}
          className="mt-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white"
        >
          Post Comment
        </button>

        {/* Comment List */}
        <div className="mt-6">
          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="border-b border-gray-600 py-3">
                
                <p className="text-green-300 font-semibold">{c.name}</p>
                <p className="text-white">{c.text}</p>
                <p className="text-sm text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        <button onClick={handleSignOut} className="font-bold mr-4 text-white absolute right-6 top-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
        Sign Out
      </button>
      </div>
    </div>
  );
};

export default MovieDetails;
