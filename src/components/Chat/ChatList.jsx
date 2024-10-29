import React, { Fragment, useState } from "react";
import { ImagePlaceHolder } from "../../assets/export";
import Loader from "../Global/Loader";

const ChatList = ({chatCollection, setChatId, chatId, setChatUser, loading}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredChatCollection = Array.isArray(chatCollection)
  ? chatCollection.filter((chat) =>
      chat?.chatData?.userName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
  return (
    <Fragment>
      <div className="w-full bg-white lg:h-[85vh] rounded-xl">
        <div className="w-full h-[13%] border-b flex flex-col items-start justify-center gap-1 px-4">
          <h1 className="text-base font-semibold">Chats</h1>
          <input
            type="text"
            className="border py-1.5 px-3 rounded-lg w-full text-sm outline-none bg-gray-50"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {loading?(
          <div class="flex items-center justify-center w-full h-full -mt-16">
          <div class="flex justify-center items-center space-x-1 text-sm text-[#64B5AC]">
            <svg fill="none" class="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path
                clip-rule="evenodd"
                d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                fill="currentColor" fill-rule="evenodd"
              />
            </svg>
            <div>Loading ...</div>
          </div>
        </div>
        ):
        (
          <Fragment>
          {Array.isArray(filteredChatCollection) && chatCollection?.length > 0 ? (
            <div className="w-full max-h-[87%] overflow-y-scroll message-container pb-2">
              {filteredChatCollection?.map((chat) => (
                <div  
                  onClick={() => {setChatId(chat?.chatId); setChatUser({ image: chat?.chatData?.userProfile || "",
                    name: chat?.chatData?.userName || "" })}}
                  key={chat?.chatId}
                  className={`w-full flex border-b py-4 px-4 gap-3 cursor-pointer transition-all duration-300 ${
                    chatId === chat?.chatId ? "bg-gray-200" : "hover:bg-gray-50"
                  }`}
                >
                  {!chat?.chatData?.userProfile ? (
                    <img
                      src={ImagePlaceHolder}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <img
                      src={chat?.chatData?.userProfile}
                      alt="chat"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex flex-col overflow-x-hidden w-[75%]">
                    <h1 className="text-sm font-medium">
                      {chat?.chatData?.userName}
                    </h1>
                    <p className="text-xs font-normal text-gray-400">
                      {chat?.messages[0]?.text}
                    </p>
                  </div>
                  {chat?.unreadMessagesCount ?
                  <div className="flex justify-end items-center "><span className="bg-[#64B5AC] text-white text-xs rounded-full h-5 w-5 flex ml-6 items-center justify-center">
                  {chat?.unreadMessagesCount}
                </span></div> : ""}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center pt-8">
              <p>No Chat Found</p>
            </div>
          )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default ChatList;
