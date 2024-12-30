// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import Signup from "./components/Signup";
import React, { Suspense } from "react";
const Navbar=React.lazy(()=>import('./components/Navbar'));
const Home=React.lazy(()=>import('./components/Home'));
const Login=React.lazy(()=>import('./components/Login'));
const Profile=React.lazy(()=>import('./components/Profile'));
const Signup=React.lazy(()=>import('./components/Signup'));
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import {useIsAuth } from "./utils/IsAuth";

const App = () => {
  const { auth } = useIsAuth();

  return (
    <>
      <Toaster position="bottom-right" />

     <Suspense fallback={<div className="w-full h-screen flex justify-center items-center">
         <span className="loading loading-dots"></span>
     </div>}>

        
      <div>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={auth!=null ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={auth!=null? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/login"
            element={auth==null ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={auth!=null? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

     </Suspense>

    </>
  );
};

export default App;
