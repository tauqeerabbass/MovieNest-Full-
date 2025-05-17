import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { validateUserData } from "../utils/Validate";
import { BGIMG_URL } from "../utils/constans";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const message = validateUserData(formData.email, formData.password);
    setErrorMessage(message);
    if (message) return;

    const endpoint = isSignInForm
      ? `http://localhost:5000/api/auth/login`
      : `http://localhost:5000/api/auth/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.msg || "Something went wrong");
      } else {
        // Save JWT token
        localStorage.setItem("token", data.token);

        dispatch(
          setUser({
            uid: data.user.id,
            email: formData.email,
            displayName: data.user.name,
            role: data.user.role, // <-- store role
          })
        );

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/browse");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Network error or server not responding");
    }
  };

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
  };

  return (
    <div>
      <img src={BGIMG_URL} alt="Background" />

      <form
        className="bg-black absolute mt-[-615px] mx-auto right-0 left-0 w-4/12 rounded-lg opacity-90"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-3xl text-white font-bold ml-12 p-4 pt-12 pb-7">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
          type="email"
          placeholder="Email Address"
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-600 w-72 mx-16 mb-4 p-[13px] rounded-lg"
          type="password"
          placeholder="Password"
        />

        <p className="font-bold text-lg text-red-600 mx-16 my-4">
          {errorMessage}
        </p>

        <button
          className="w-72 bg-red-600 text-white mx-16 p-2 rounded-lg"
          type="submit"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="text-white mx-16 mt-8 cursor-pointer mb-12"
          onClick={toggleForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already a member? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
