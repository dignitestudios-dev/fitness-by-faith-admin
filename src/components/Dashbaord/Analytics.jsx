import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { FaDumbbell } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";

const Analytics = ({stats}) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="w-full rounded-xl px-6 py-8 flex items-center justify-between gap-2.5 bg-white">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-400">Total Users</h3>
          <h1 className="text-2xl font-medium">{stats?.totallUsers?.toFixed(2)}</h1>
        </div>
        <div className="w-14 h-14 bg-[#dcefed] rounded-full flex items-center justify-center">
          <FaUsers className="text-3xl text-[#64B5AC]" />
        </div>
      </div>
      <div className="w-full rounded-xl px-6 py-8 flex items-center justify-between gap-2.5 bg-white">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-400">Total Revenue</h3>
          <h1 className="text-3xl font-medium">{stats?.totallRevenue?.toFixed(2)}</h1>
        </div>
        <div className="w-14 h-14 bg-[#dcefed] rounded-full flex items-center justify-center">
          <FaSackDollar className="text-3xl text-[#64B5AC]" />
        </div>
      </div>
      <div className="w-full rounded-xl px-6 py-8 flex items-center justify-between gap-2.5 bg-white">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-400">
            Basic Plans Sold
          </h3>
          <h1 className="text-3xl font-medium">{stats?.totallBasicPlans?.toFixed(2)}</h1>
        </div>
        <div className="w-14 h-14 bg-[#dcefed] rounded-full flex items-center justify-center">
          <FaDumbbell className="text-3xl text-[#64B5AC]" />
        </div>
      </div>
      <div className="w-full rounded-xl px-6 py-8 flex items-center justify-between gap-2.5 bg-white">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-400">
            Premium Plans Sold
          </h3>
          <h1 className="text-3xl font-medium">{stats?.totallPrimiumPlan?.toFixed(2)}</h1>
        </div>
        <div className="w-14 h-14 bg-[#dcefed] rounded-full flex items-center justify-center">
          <GiMeal className="text-3xl text-[#64B5AC]" />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
