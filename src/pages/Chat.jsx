import React, { useContext, useEffect, useState } from 'react'
import ChatBox from '../components/Chat/ChatBox'
import ChatList from '../components/Chat/ChatList'
import { TbMenu2 } from "react-icons/tb";
import MobileChatList from '../components/Chat/MobileChatList';
import {db} from "../firebase/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Axios from "../axios"
import { ErrorToaster } from '../components/Global/Toaster';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const {uid} = useContext(AuthContext);
  const [showChatList, setShowChatList] = useState(false);
  const [loading, setLoading] = useState(true)
  
  const handleShowList = ()=>{
    setShowChatList(!showChatList);
  }

  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [chatCollection , setChatCollection] = useState("");
  const [messageText , setMessageText] = useState("");
  const [update, setUpdate] = useState("")
  const [chatId , setChatId] = useState("")
  const [chatUser , setChatUser] = useState({image: "", name:""})

  const sendMessage = async() => {
   let messageData = {
    "message" : messageText,
    "chatId" : chatId
    }
    try {
      setMessageText("")
      const {data} = await Axios.post('support/chat/admin/send', messageData);
      if (data.status === 200) {
        setMessageText("")
      }
      else{
        ErrorToaster(data.message[0])
      }
    } catch (error) {
      console.error('Error is-> ', error);
    }
  };
 
  const chatData = async()=>{
    try {
      const { data } = await Axios.get("support/chat/admin");
      if(data.status === 200){
        setChatCollection(data?.data)
        setLoading(false);
      }else{
        ErrorToaster(data?.message[0])
      } 
    } catch (error) {
      console.log("Error:", error);
      ErrorToaster(error?.message)
    } finally {
      setLoading(false);
    }
  }
  useEffect(()=>{
    chatData()
  },[])

  const messageRead=async()=>{
    console.log("function Call==+")
    const { data } = await Axios.put("support/chat/read", {chatId:chatId});
    if(data.status === 200){
      chatData()
    }else{
      console.log(data?.message[0])
    } 
  }

  useEffect(() => {
    if (chatId) {
      try {
        messageRead()
        setMessageLoading(true);

        const docRef = collection(db, "chat", chatId, "messages");

        const orderedQuery = query(docRef, orderBy("createdAt"));

        const unsubscribe = onSnapshot(orderedQuery, (querySnapshot) => {
          const documentsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setMessages(documentsArray);

          setMessageLoading(false);

        });

        return () => {
          unsubscribe();
        };
      } catch (err) {
        console.log(err);
      }
    }
  }, [chatId]);


  return (
    <div className='w-full relative lg:h-[85vh]'>
      {/* <button className='mb-4 float-end absolute top-[-22px] right-0' onClick={handleShowList}><TbMenu2 className='text-xl'/></button>
      <MobileChatList onclick={handleShowList} showChatList={showChatList}/> */}
      <div className="w-full h-full grid grid-cols-3 gap-6">
        <div className="col-span-2 lg:col-span-2">
            <ChatBox messageLoading={messageLoading} messages={messages} messageText={messageText} setMessageText={setMessageText} chatUser={chatUser} uid={uid} sendMessage={sendMessage}/>
        </div>
        <div className="col-span-1 lg:col-span-1 lg:block">
            <ChatList chatCollection={chatCollection} loading={loading} setChatId={setChatId} chatId={chatId} setChatUser={setChatUser}/>
        </div>
      </div>
    </div>
  )
}

export default Chat
