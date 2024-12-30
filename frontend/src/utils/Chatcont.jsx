import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useIsAuth } from "./IsAuth";
import axios from "../utils/Axios";

export const chatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { auth, Socket } = useIsAuth();
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null);

  const getUsers = async () => {
    try {
      setLoading(true);
      let res = await axios.get("/api/messages/showuser", {
        withCredentials: true,
      });
      if (res.data.success) {
        setUser(res.data.message);
      }
      // console.log(res);
    } catch (er) {
      console.log(er.message);
      toast.error(er.message);
    } finally {
      setLoading(false);
    }
  };

  const getMessages = async (id) => {
    if (!selectedUser) return;
    try {
      setLoading(true);
      let res = await axios.get(`/api/messages/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setLoading(false);
        setMessages(res.data.message);
      }
    } catch (er) {
      toast.error(er.message);
      console.log(er.message);
    }
  };

  const sendMessages = async (data) => {
    try {
      let res = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        data,
        { withCredentials: true }
      );
      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.message]);
      } else {
        toast.error("something went wrong");
      }
    } catch (er) {
      toast.error(er.message);
    }
  };

  const subMessages = () => {
    if (!selectedUser) return;

    Socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
      return;
    });

    Socket.on("typing", (data) => {
      if (data.isTyping) {
        if (data.senderId == selectedUser._id) {
          setTyping(data.isTyping);
        }
      } else {
        setTyping(null);
      }
    });
  };

  const unsubMessages = useCallback(() => {
    Socket.off("newMessage");
    Socket.off("typing");
  });

  return (
    <chatContext.Provider
      value={{
        user,
        Socket,
        selectedUser,
        setSelectedUser,
        getMessages,
        getUsers,
        messages,
        sendMessages,
        loading,
        subMessages,
        unsubMessages,
        typing,
        setTyping,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(chatContext);
};
