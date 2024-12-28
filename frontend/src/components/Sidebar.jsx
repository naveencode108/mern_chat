import React, { useEffect } from "react";
import { useChat } from "../utils/Chatcont";
import { CiUser } from "react-icons/ci";
import { useIsAuth } from "../utils/IsAuth";

const Sidebar = () => {
  const { user, selectedUser, setSelectedUser, getUsers } = useChat();
  const { onlineUser } = useIsAuth();

  useEffect(() => {
    getUsers();
  }, []);

  console.log(onlineUser);
  return (
    <aside className="h-full w-32 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-6">
        <div className="flex items-center gap-2">
          <CiUser className="size-6" />
          <span className="font-medium hidden lg:block">Contact</span>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {user.map((item) => (
            <button
              key={item._id}
              onClick={() => setSelectedUser(item)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 rounded-xl transition-colors mb-3 ${
                selectedUser?._id === item._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative">
                <img
                  src={
                    item.profilePic ||
                    "https://imgs.search.brave.com/4KZYIoORrEk3lsmtCvb5Vd6IcIfyGmibtiB0H6ZZo-o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzExLzU0LzMz/LzM2MF9GXzgxMTU0/MzMzMF9LZk5ZdWtw/RFVRZG1YSUt6Y005/Z2tLOU12dHdPTzhC/ai5qcGc"
                  }
                  alt={item.fullName}
                  className="size-10 object-cover rounded-full"
                />

                {onlineUser && onlineUser.includes(item._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{item.fullName}</div>
                <span className="text-[13px]">
                  {onlineUser && onlineUser.includes(item._id)?'Online': 'Offline'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
