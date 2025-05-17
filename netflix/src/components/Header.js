import React from "react";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { LOGO_URL } from "../utils/constans";
import { USER_ICON } from "../utils/constans";
import { setSearchView } from "../utils/gptSlice";
import { LANGUAGE_OPTIONS } from "../utils/constans";
import { setLanguage } from "../utils/languageSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const gptSearch = useSelector((store) => store.gpt.searchView);

  const handleSignOut = () => {
    dispatch(removeUser()); // clear user from Redux
    localStorage.removeItem("token"); // clear token from localStorage
    navigate("/"); // redirect to login page
  };

  const handleToggleSearch = () => {
    dispatch(setSearchView());
  };

  const handlelanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div className="flex justify-between bg-gradient-to-b from-black relative">
      <div>
        <img
          className="absolute w-[350px] left-12 top-[-10px] py-4 px-[80px]"
          src={LOGO_URL}
          alt="logo"
        />
      </div>
      {user && (
        <div className="flex p-4">
          {gptSearch && (
            <select
              className="bg-gray-900 text-white mr-6 rounded-md border border-white px-3"
              onChange={handlelanguageChange}
            >
              {LANGUAGE_OPTIONS.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleToggleSearch}
            className="bg-black border border-white text-white rounded-lg px-6 mr-8"
          >
            {gptSearch ? "Homepage" : "Search"}
          </button>
          <img alt="userLogo" className="w-12 pr-3" src={USER_ICON} />
          <button onClick={handleSignOut} className="font-bold mr-4 text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
