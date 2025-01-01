import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "../utils/Axios";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useIsAuth } from "../utils/IsAuth";
import { useChat } from "../utils/Chatcont";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
   
  const {setAuth,connectSocket} = useIsAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email == "") {
      toast.error("Email is Required");
      return;
    }

    if (password == "") {
      toast.error("Password is Required");
      return;
    }

    try {
      let res = await axios.post(
        "/api/auth/login",
        { email, password },
        {withCredentials:true}
      );
      if (res.data.success) {
        toast.success("Welcome");
        // sessionStorage.setItem("login_token", res.data.message);
        setAuth(res.data.message);
        connectSocket(res.data.message._id);
        navigate("/");
      }
      else{
        toast.error(res.data.message);
      }
    } catch (er) {
      toast.error(er.message);
      console.log(er.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg w-full max-w-md p-6">
          <h1 className="text-2xl font-semibold text-center text-sky-500 mb-6">
            Login Here To Chat
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // required
                className="px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                type={show?'text':'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Enter your password"
              />
              <button type="button" onClick={()=>setShow(!show)} className="absolute top-10 right-2 ">
                {show ? (
                  <IoIosEyeOff />
                ) : (
                  <IoIosEye />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sky-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
