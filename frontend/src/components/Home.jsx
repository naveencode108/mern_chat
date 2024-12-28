import React from "react";
import { useChat } from "../utils/Chatcont";
import Sidebar from "./Sidebar";
import ChatContainer from "./ChatContainer";
import { MdMessage } from "react-icons/md";
import { useIsAuth } from "../utils/IsAuth";

const Home = () => {
  const { selectedUser, setSelectedUser } = useChat();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center px-4">
        <div className="bg-base-100 rounded-lg shadow w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? (
              <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
                <div className="max-w-md text-center space-y-6">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                        <MdMessage className="size-5" />
                      </div>
                    </div>
                  </div>
                  <h2 className='text-2xl font-bold'>Welcome to ChatEr</h2>
                  <p className='text-base-content/60'>
                    Select a conversation from the sidebar to start chatting
                  </p>
                </div>
              </div>
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
