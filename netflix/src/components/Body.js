import React from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "./AdminDashboard";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "/movie/:movieId",
      element: <MovieDetails />
    },
    {
      path: "/admin",
      element: <AdminDashboard />
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
