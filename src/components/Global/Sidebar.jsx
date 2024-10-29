import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";
import { LuFolderOpenDot } from "react-icons/lu";
import { TbFileInvoice } from "react-icons/tb";
import { Logo } from "../../assets/export";
import { styles } from "../../styles/styles";
import { LiaDumbbellSolid } from "react-icons/lia";
import { MdOutlineNoMeals } from "react-icons/md";
import { PiUsers } from "react-icons/pi";
import { PiUsersThreeBold } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { MdOutlineContactSupport } from "react-icons/md";
import { FiVideo } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const {pathname} = useLocation()
  let currentLoc = pathname.split("/")
  
  const [activeLink, setActiveLink] = useState("Dashboard");

  const navigateToLink = (link, name) => {
    navigate(link);
    setActiveLink(name);
  };

  const Logout =()=> {
    logout()
    navigate("/login")
  }

  return (
    <div className="w-full py-6 px-2 lg:px-6 flex flex-col items-center gap-y-6">
      <div className="">
        <img src={Logo} alt="" className="w-16" />
      </div>
      <ul className="w-full flex flex-col gap-y-2">
        <li className={`w-full text-black`}>
          <button
            onClick={() => navigateToLink("/dashboard", "Dashboard")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              currentLoc[1] === "dashboard"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <LuLayoutDashboard className="text-lg" /> Dashboard
          </button>
        </li>
        <li className="w-full ">
          <button
            onClick={() => navigateToLink("/workout-plans", "WorkoutPlans")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "WorkoutPlans" || currentLoc[1] === "workout" || currentLoc[1] === "create-workout" || currentLoc[1] === "workout-plans"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <LiaDumbbellSolid className="text-xl" /> Workouts
          </button>
        </li>
        <li className="w-full ">
          <button
            onClick={() => navigateToLink("/videos", "Videos")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Videos" || currentLoc[1] === "video" || currentLoc[1] === "videos"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <FiVideo className="text-xl" /> Videos
          </button>
        </li>
        <li className="w-full ">
          <button
            onClick={() => navigateToLink("/meal-plans", "MealPlans")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "MealPlans" || currentLoc[1] === "meal" || currentLoc[1]=== "create-meal-plan" || currentLoc[1]=== "meal-plans"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <MdOutlineNoMeals className="text-lg" /> Meals
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => navigateToLink("/users", "Users")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Users" || currentLoc[1] === "user" || currentLoc[1] === "users"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <PiUsers className="text-xl" /> Users
          </button>
        </li>
        <li className="w-full ">
          <button
            onClick={() => navigateToLink("/revenue", "revenue")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "revenue"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <TbFileInvoice className="text-lg" /> Revenue
          </button>
        </li>
        <li className=" w-full">
          <button
            onClick={() => navigateToLink("/push-notifications", "Notifications")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Notifications"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <IoNotificationsOutline className="text-lg" /> Notifications
          </button>
        </li>
        <li className=" w-full">
          <button
            onClick={() => navigateToLink("/support-requests", "Tickets")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Tickets" || currentLoc[1] === "support-requests"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <MdOutlineContactSupport className="text-lg" /> Support Tickets
          </button>
        </li>
        <li className=" w-full">
          <button
            onClick={() => navigateToLink("/help-and-support", "Chat")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Chat" || currentLoc[1] === "help-and-support"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <BiSupport className="text-lg" /> Help and Support
          </button>
        </li>
        <li className=" w-full">
          <button
            onClick={() => navigateToLink("/update-password", "Password")}
            className={`text-sm flex items-center gap-3 font-medium w-full py-3 px-6 rounded-lg ${
              activeLink === "Password"
                ? `text-white ${styles.bgColor}`
                : `bg-transparent text-black hover:${styles.bgColor} hover:text-white transition-all duration-300`
            }`}
          >
            <FiLock className="text-lg" /> Update Password
          </button>
        </li>
        <li className={`w-full  text-white`}>
          <button
            onClick={Logout}
            className="text-sm font-medium w-full py-3 px-6 flex items-center gap-3 text-black rounded-lg hover:bg-[#64B5AC] hover:text-white transition-all duration-300"
          >
            <HiOutlineLogout className="text-lg" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
