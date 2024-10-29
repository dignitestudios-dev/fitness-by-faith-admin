import React, { Fragment, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { styles } from "../../styles/styles";
import { BsEmojiSmile } from "react-icons/bs";
import { ImagePlaceHolder } from "../../assets/export";
import Loader from "../Global/Loader";
import ChatLoader from "./ChatLoader";

const ChatBox = ({messages, messageText, setMessageText, chatUser, uid, sendMessage, messageLoading}) => {

const groupMessagesByDate = (messages) => {
  return messages?.reduce((groups, message) => {
    const date = new Date(message?.createdAt?.seconds * 1000).toDateString(); 
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date]?.push(message);
    return groups;
  }, {});
};

const groupedMessages = groupMessagesByDate(messages);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && messageText.trim()) {
      sendMessage();
    }
  };

  const lastMessageRef= useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  return (
    <div className="flex-1 justify-between flex flex-col h-[85vh] bg-white rounded-xl">
      <div className="flex items-center justify-start gap-2 py-3 px-4 border-b border-gray-200">
        {!chatUser.image ? (
          <img src={ImagePlaceHolder} alt="" className="w-9 h-9 rounded-full" />
        ) : (
          <img src={chatUser.image} alt="" className="w-9 h-9 rounded-full" />
        )}
        <h1 className="text-sm font-medium">
          {chatUser.name ? chatUser.name : "User Name"}
        </h1>
      </div>
      {messageLoading ? (
        <ChatLoader />
      ) : (
        <Fragment>
          {messages?.length > 0 ? (
            <div
              id="messages"
              className="flex flex-col p-3 overflow-y-auto message-container h-full"
            >
              {Object.keys(groupedMessages)?.map((date, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-center my-2">
                  <hr className="h-px my-1 w-[20%] bg-gray-100 border-0"/>
                  <div className="text-center text-xs text-gray-400 mx-2 w-auto">
                    {new Date(date)?.toDateString() === new Date()?.toDateString()
                      ? "Today"
                      : new Date(date)?.toDateString() ===
                        new Date(Date.now() - 86400000)?.toDateString()
                      ? "Yesterday"
                      : date}
                  </div>
                  <hr className="h-px my-1 w-[20%] bg-gray-100 border-0"/>
                  </div>
                  
                  {groupedMessages[date]?.map((message, id) => (
                    <Fragment key={id}>
                      {message?.senderUID !== uid ? (
                        <div key={id} className="chat-message mb-2">
                          <div className="flex items-end">
                            <div className="flex flex-col space-y-0 text-xs max-w-xs mx-2 order-2 items-start">
                              <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-[#F7F7F7] text-black">
                                  {message?.text}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#5C5C5C]">
                                {new Date(message?.createdAt?.seconds * 1000)?.toLocaleString()?.split(",")[1]}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={id} className="chat-message">
                          <div className="flex items-end justify-end">
                            <div className="flex flex-col text-xs max-w-xs mx-2 order-1 items-end">
                              <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-[#64B5AC] text-white ">
                                  {message?.text}
                                </span>
                              </div>
                              <span className="text-[10px] text-[#5C5C5C]">
                                {new Date(message?.createdAt?.seconds * 1000)?.toLocaleString()?.split(",")[1]
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              ))}
              <div ref={lastMessageRef} />
            </div>
          ) : (
            <div className="flex justify-center pt-8">
              <p className="text-gray-500">Select chat from list</p>
            </div>
          )}
        </Fragment>
      )}

      <div className="px-4 p-2 mb-2 sm:mb-0 flex items-center gap-2 border-t">
        <div className="w-full flex items-center justify-between bg-gray-100 px-4 rounded-full h-[50px]">
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none px-3 text-xs text-[#5C5C5C]"
            placeholder="Message"
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e)}
            value={messageText}
          />
        </div>
        <button
          onClick={() => {
            sendMessage();
          }}
          className={`h-[50px] w-[50px] flex items-center justify-center px-4 rounded-full ${styles.bgColor}`}
        >
          <IoSend className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
