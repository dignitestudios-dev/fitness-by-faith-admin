import React from "react";
import { IoClose } from "react-icons/io5";

const MobileChatList = ({ showChatList, onclick }) => {
  return (
    showChatList && (
      <div
        className={`w-full h-screen fixed top-0 left-0 right-0 ${
          showChatList ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 bottom-0 z-50 bg-white`}
        onClick={onclick}
      >
        
        <div className="bg-white w-full h-full flex flex-col overflow-y-scroll relative">
        <div className="w-full px-6 pt-3 absolute top-0 left-0 bg-white">
            <button onClick={onclick}><IoClose className="text-xl"/></button>
        </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
          <div className="w-full flex border-b py-4 px-4 gap-3 cursor-pointer hover:bg-gray-50 transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col overflow-x-hidden">
              <h1 className="text-sm font-medium">John Doe</h1>
              <p className="text-xs font-normal text-gray-400">
                I'm looking to work with a designer that can...
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MobileChatList;
