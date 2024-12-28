import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Setting from "./components/Setting";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import { Toaster, toast } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { isAuthContext, useIsAuth } from "./utils/IsAuth";
import { useContext, useEffect } from "react";
import { io } from 'socket.io-client';

const App = () => {
  const { auth } = useIsAuth();

  return (
    <>
      <Toaster position="bottom-right" />

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
          {/* <Route path="/setting" element={<Setting />} /> */}
          <Route
            path="/profile"
            element={auth!=null? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
