import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/Auth";
import {login, logout} from "./store/authSlice";
import "./index.css";
import {Head, Footor} from "./Components/index"
import {Outlet} from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // console.log(process.env.REACT_APP_APPWRITE_URL) // this is how we get access of env variable in react
  // console.log(import.meta.env.VITE_APPWRITE_URL); // this is how we access the variable in vite react app and defining way is also diffrent

  useEffect(() => {
    // const createSessionOnLoad = async () => {
    //   try {
    //     // Call the method from your AuthService to create a session
    //     await authService.createSession();
    //     console.log('Session created successfully on application load.');
    //   } catch (error) {
    //     console.error('Error creating session:', error);
    //   }
    // };

    // createSessionOnLoad();
    authService.getCurrentUser()
      .then((userData) => {
        console.log(`got promise`)
        if (userData) {
          dispatch(login({userData})); // here data goes with destructuring because it coming from appwrite and here we are taking it as promise so do {}   
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-col bg-white">
    <div className="w-full">
      <Head />
      <main className="container mx-auto px-4 py-16">
        <Outlet />
      </main>
    </div>
    <Footor />
  </div>
  ) : null
}

export default App;
