import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/Axios";
import { CiPickerHalf } from "react-icons/ci";
import toast from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onloadend = (d) => {
      setImage(d.target.result);
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name == "") {
      toast.error("Name Required");
      return;
    }

    let data = {
      name,
      image,
    };

    try {
      setLoading(true);
      let res = await axios.post("/api/auth/update_profile", data, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setLoading(false);
      }
    } catch (er) {
      console.log(er.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      let res = await axios.get("/api/auth/get_user", {
        withCredentials: true,
      });

      if (res.data.success) {
        setName(res.data.message[0].fullName);
        setUser(res.data.message);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="h-96 w-96 bg-base-300 rounded-lg shadow-lg">
        {/* User Image */}
        <div className="w-full h-1/2 bg-base-200 flex justify-center items-center rounded-t-lg ">
          <div className="relative p-2">
            {image ? (
              <img
                src={image}
                alt="User Profile"
                className="h-32 w-32 rounded-full object-cover border-2  p-1 border-white shadow-md"
              />
            ) : (
              <img
                src={
                  user.length > 0 && user[0].profilePic
                    ? user[0].profilePic
                    : ""
                }
                alt="User Profile"
                className="h-32 w-32 rounded-full object-cover border-2  border-white shadow-md"
              />
            )}
            <input
              ref={imageRef}
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <CiPickerHalf
              onClick={() => {
                if (imageRef.current) {
                  imageRef.current.click();
                }
              }}
              className="border size-7 rounded-full absolute bottom-0 right-0 cursor-pointer"
            />
          </div>
        </div>
        {/* User Info */}
        <div className="h-1/2 p-4 flex flex-col justify-center items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-700">
            {user.length > 0 && user[0].fullName}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-3"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-3/4 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-indigo-200"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition flex justify-center items-center"
            >
              {loading ? <span className="loading loading-dots"></span> : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
