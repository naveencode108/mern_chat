import React from "react";
import { Link } from "react-router-dom";
import { useIsAuth } from "../utils/IsAuth";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdMessage } from "react-icons/md";


const Navbar = () => {
  const { auth, setAut, logout } = useIsAuth();

  return (
    <>
    <nav className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/10">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-85 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MdMessage className="size-5"/>

              </div>
              <h1 className="text-lg font-bold "> ChatEr</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* <Link to=''>

              </Link> */}

            {auth && (
              <>
                <Link to="/profile" className="btn btn-sm ">
                  <CiUser className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                <IoIosLogOut className="size-5"/>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    <div className="h-16 "></div>
    </>

  );
};

export default Navbar;
