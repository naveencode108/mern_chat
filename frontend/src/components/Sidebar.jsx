import React, { useEffect, useRef, useState } from "react";
import { useChat } from "../utils/Chatcont";
import { CiUser } from "react-icons/ci";
import { useIsAuth } from "../utils/IsAuth";

const Sidebar = () => {
  const { user, selectedUser, setSelectedUser, getUsers, Socket, messages } =
    useChat();
  const { onlineUser } = useIsAuth();
  const [id, setId] = useState([]);
  const countRef = useRef(0);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      setId(id.filter((item) => item.userId != selectedUser._id));
    }

    const handleNewMessage = (data) => {
      if (!selectedUser) {
        countRef.current = countRef.current + 1;
        let userId = data.senderId;

        setId((prev) => {
          let find = prev.find((item) => item.userId === userId);

          if (find) {
            return prev.map((d) => {
              countRef.current = d.cnt + 1;
              return d.userId === userId ? { ...d, cnt: countRef.current } : d;
            });
          } else {
            countRef.current = 1;
            return [...prev, { userId: userId, cnt: countRef.current }];
          }
        });
      } else {

        if (selectedUser._id != data.senderId) {
          let userId = data.senderId;
          setId((prev) => {
            let find = prev.find((item) => item.userId === userId);
            if (find) {
              return prev.map((d) => {
                countRef.current = d.cnt + 1;
                return d.userId === userId
                  ? { ...d, cnt: countRef.current }
                  : d;
              });
            } else {
              countRef.current = 1;
              return [...prev, { userId: userId, cnt: countRef.current }];
            }
          });
        }

      }

    

    };

    Socket.on("newMessage", handleNewMessage);

    return () => {
      Socket.off("newMessage", handleNewMessage);
    };
  }, [selectedUser, messages]);

  return (
    <aside className="h-full w-40 md:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-6">
        <div className="flex items-center gap-2">
          <CiUser className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
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

              <div className=" text-left min-w-0 relative">
                <div className="font-medium truncate md:block hidden">
                  {item.fullName}

                  <span className="text-sm text-gray-500 block">
                    {onlineUser && onlineUser.includes(item._id)
                      ? "Online"
                      : "Offline"}
                  </span>
                  {id.length > 0 &&
                    id.map((urmsg) => {
                      return (
                        item._id === urmsg.userId && (
                          <span
                            key={item._id}
                            className="block text-xs text-red-500 mt-1"
                          >
                            {urmsg.cnt} new message
                          </span>
                        )
                      );
                    })}
                </div>
                {id.length > 0 &&
                  id.map((urmsg) => {
                    return (
                      item._id === urmsg.userId && (
                        <div key={item._id} className="block md:hidden">
                          <span className="absolute bottom-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                            {urmsg.cnt}
                          </span>
                        </div>
                      )
                    );
                  })}
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
