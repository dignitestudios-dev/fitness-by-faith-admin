import React, { Fragment, useEffect, useState } from "react";
import NotificationList from "../components/Notifications/NotificationList";
import { styles } from "../styles/styles";
import CreateNotificationModal from "../components/Notifications/CreateNotificationModal";
import Loader from "../components/Global/Loader";
import Axios from "../axios"

const Notifications = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)
  const [notifications , setNotifications] = useState("")

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const getNotifications = async()=>{
    try {
      setLoading(true);
      const { data } = await Axios.get("notification/admin");
      setNotifications(data?.data)
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getNotifications()
  },[])

  return (
    <div className="flex flex-col gap-6 min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <button
          onClick={handleModal}
          className={`text-xs ${styles.bgColor} text-white px-4 py-3 rounded-lg`}
        >
          Create Notification
        </button>
      </div>
      {loading?<Loader/>:
      <Fragment>
        {notifications && 
        <NotificationList notifications={notifications}/>
      }
      </Fragment>
      } 
      <CreateNotificationModal showModal={showModal} onclick={handleModal}/>
    </div>
  );
};

export default Notifications;
