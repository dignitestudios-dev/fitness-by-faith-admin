import React from 'react'

const ChatLoader = () => {
  return (
    <div
    id="messages"
    className="flex flex-col space-y-4 p-3 overflow-y-auto message-container"
  >
    {[...Array(3)].map((_, index) => (
      <div key={index} className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-0 text-xs max-w-xs mx-2 order-2 items-start">
            <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 animate-pulse w-32 h-6"></div>
          </div>
        </div>
      </div>
    ))}
    {[...Array(2)].map((_, index) => (
      <div key={index} className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col text-xs max-w-xs mx-2 order-1 items-end">
            <div className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 animate-pulse w-32 h-6"></div>
          </div>
        </div>
      </div>
    ))}
    {[...Array(3)].map((_, index) => (
      <div key={index} className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-0 text-xs max-w-xs mx-2 order-2 items-start">
            <div className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 animate-pulse w-32 h-6"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ChatLoader