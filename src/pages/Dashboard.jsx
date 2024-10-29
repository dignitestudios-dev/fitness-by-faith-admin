import React, { useEffect, useState } from "react";
import Analytics from "../components/Dashbaord/Analytics";
import AnalyticalChart from "../components/Dashbaord/AnalyticalChart";
import RecentUsersList from "../components/Dashbaord/RecentUsersList";
import { IoCalendarOutline } from "react-icons/io5";
import FilterCalendar from "../components/Dashbaord/FilterCalendar";
import { ErrorToaster } from "../components/Global/Toaster";
import Axios from "../axios"
import Loader from "../components/Global/Loader";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([])
  const [stats, setStats] = useState([])
  const [revenue, setRevenue] = useState([])
  const [loading, setLoading] = useState(false)

  const [showCalendar, setShowCalendar] = useState(false);
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`users/recent?limit=5&page=1&pagination=true`);
      setUsersData(data?.data[0]?.user);
    } catch (error) {
      ErrorToaster(error?.message)
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllStats = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`users/dashboard`);
      setStats(data?.data);
    } catch (error) {
      ErrorToaster(error?.message)
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRevenue = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`users/revenue`);
      setRevenue(data?.data);
    } catch (error) {
      ErrorToaster(error?.message)
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getAllStats()
    getAllUsers()
    getRevenue()
  },[])

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        {/* <button onClick={handleShowCalendar} className="text-xs font-medium px-4 py-2 rounded-full bg-gray-200 flex items-center justify-center gap-1">
          <IoCalendarOutline className="text-base" />
          Select Date
        </button>
        <FilterCalendar
          showCalendar={showCalendar}
          onclick={handleShowCalendar}
        /> */}
      </div>
      {loading?(
        <Loader/>
      ):(
        <>
        <Analytics stats={stats}/>
      <AnalyticalChart graphData={revenue?.graphData} stats={stats} />
      {usersData &&
      <RecentUsersList usersData={usersData} loading={loading}/>
      }
      </>
      )}
    </div>
  );
};

export default Dashboard;

// total users, total revenue, total meal plans sold, total workout plans sold
