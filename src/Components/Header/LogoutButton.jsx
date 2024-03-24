import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/Auth"; // err 3 I was importing logout from configration 
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler} // error 3-> I was calling function by () but I have to pass its refrence 
    >
      Logout
    </button>
  );
}

export default LogoutButton;
