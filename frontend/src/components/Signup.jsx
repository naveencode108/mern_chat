import axios from "../utils/Axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
 
   const [name,setName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [confirmPassword,setConfirmPassword]=useState('');
   const navigate=useNavigate();


   const handleSubmit=async(e)=>{
    e.preventDefault();
    
    if(password!==confirmPassword){
      toast.error('Password do not match');
      return;
    }

    try{
       let res=await axios.post('/api/auth/signup',{fullName:name,email,password},{withCredentials:true});

       if(res.data.success){
        toast.success(res.data.message);
        navigate('/login');
      }
      else{
         toast.error(res.data.message);
       }
    }
    catch(er){
      toast.error(er.message);
      console.log(er.message);
    }

   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-center text-sky-500 mb-6">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
               value={name}
               onChange={(e)=>setName(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Enter your name"
            />
          </div>
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
              required
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              minLength={5}
              onChange={(e)=>setPassword(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Create a password"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              minLength={5}
              required
               value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
