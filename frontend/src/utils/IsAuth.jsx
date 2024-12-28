import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/Axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useChat } from "./Chatcont";

export const isAuthContext = createContext();

export const Provider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Socket, setSocket] = useState(null);
  const [onlineUser,setOnlineUsers]=useState();

  useEffect(() => {
    const check = async () => {
      try {
        let res = await axios.get("/api/auth/check", { withCredentials: true });
        if (res.data.success) {
          setAuth(res.data.message);
          connectSocket(res.data.message._id);
        } else {
          setAuth(null);
          connectSocket(null);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  const logout = async () => {
    try {
      let res = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setAuth(null);
        disconnectSocket();
        toast.success(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (er) {
      console.log(er.message);
    }
  };

  const connectSocket = (val) => {
    if (!val) return;
    const socket = io("http://localhost:3000", {
      query: {
        userId: val
      }
    });
    setSocket(socket);
    socket.connect();

    socket.on('onlineUsers',(data)=>{
      setOnlineUsers(data);
    })
  };

  const disconnectSocket = () => {
    if (Socket?.connected) {
      Socket.disconnect();
    }
  };

  return (
    !loading && (
      <isAuthContext.Provider value={{ auth, setAuth, logout, connectSocket ,onlineUser,Socket}}>
        {children}
      </isAuthContext.Provider>
    )
  );
};

export const useIsAuth = () => useContext(isAuthContext);
