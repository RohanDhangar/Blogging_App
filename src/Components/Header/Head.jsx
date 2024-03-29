import React, { useState } from "react";
import { Container, Logo, LogoutButton } from "../index";
import { Link, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import authService from "../../Appwrite/Auth"; // err 3 I was importing logout from configration
import { logout } from "../../store/authSlice";

function Head() {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const authStatus = useSelector((state) => state.auth.status); // error 2
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
    navigate(item.slug);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout()); // Dispatch logout action before reload
      window.location.href = "/"; // Redirect to the login page after logout
    });
  };
  
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 shadow py-4">
        <Container>
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-white font-bold text-xl">
                <Logo />
              </Link>
            </div>
            <ul className="flex items-center space-x-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavItemClick(item)}
                      className={`inline-block px-4 py-2 rounded-full text-white ${
                        activeNavItem === item
                          ? "bg-pink-600"
                          : "bg-transparent hover:bg-pink-600"
                      } focus:outline-none focus:bg-pink-700 transition duration-300`}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="inline-block px-4 py-2 rounded-full text-white bg-transparent hover:bg-pink-600 focus:outline-none focus:bg-pink-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  {/* <p className="text-white ml-2">Welcome {user.name} !</p> */}
                  {showDropdown && (
                    <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          {user.name}'s Profile
                        </Link>
                      </li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Head;
