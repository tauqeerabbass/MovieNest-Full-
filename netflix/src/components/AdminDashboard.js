import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Header, { handleSignOut } from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(removeUser()); // clear user from Redux
    localStorage.removeItem("token"); // clear token from localStorage
    navigate("/"); // redirect to login page
  };

  useEffect(() => {
    if (!token || decoded?.role !== "admin") {
      setError("Unauthorized access. Admins only.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
    };

    Promise.all([fetchUsers(), fetchStats()]).then(() => setLoading(false));
  }, [token]);

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading admin dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {stats && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Basic Stats</h2>
          <p>Total Users: {stats.usersCount}</p>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full bg-gray-800 rounded">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.role || "user"}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      disabled={user.role === "admin"}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={handleSignOut} className="font-bold mr-4 text-white absolute right-6 top-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
        Sign Out
      </button>
    </div>
  );
};

export default AdminDashboard;
