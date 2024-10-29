import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const AnalyticalChart = ({graphData, stats}) => {
  
  const [chartData, setChartData] = useState([
    { name: "", uv: 0, pv: 0, amt: 0, cnt: 0 },
    { name: "Users", uv: 0, pv: 0, amt: 0, cnt: 0 },
    { name: "Revenue", uv: 0, pv: 0, amt: 0, cnt: 0 },
    { name: "Basic Plans Sold", uv: 0, pv: 0, amt: 0, cnt: 0 },
    { name: "Premium Plans Sold", uv: 0, pv: 0, amt: 0, cnt: 0 },
  ]);

  console.log("🚀 ~ AnalyticalChart ~ chartData:", chartData)
  useEffect(() => {
    if (stats) {
      const updatedData = [
        { name: "", uv: 0, pv: 0, amt: 0, cnt: 0 },
        {
          name: "Users",
          uv: stats?.totallUsers,
          pv: stats?.totallUsers,
          amt: stats?.totallUsers,
          cnt: stats?.totallUsers,
        },
        {
          name: "Revenue",
          uv: parseFloat(stats?.totallRevenue?.toFixed(2)), 
          pv: parseFloat(stats?.totallRevenue?.toFixed(2)),
          amt: parseFloat(stats?.totallRevenue?.toFixed(2)),
          cnt: parseFloat(stats?.totallRevenue?.toFixed(2)),
        },
        {
          name: "Basic Plans Sold",
          uv: stats?.totallBasicPlans,
          pv: stats?.totallBasicPlans,
          amt: stats?.totallBasicPlans,
          cnt: stats?.totallBasicPlans,
        },
        {
          name: "Premium Plans Sold",
          uv: stats?.totallPrimiumPlan,
          pv: stats?.totallPrimiumPlan,
          amt: stats?.totallPrimiumPlan,
          cnt: stats?.totallPrimiumPlan,
        },
      ];

      setChartData(updatedData);
    }
  }, [stats]);
  
  return (
    <div className="w-full flex flex-col gap-6 items-start p-0 md:p-6 bg-white rounded-xl">
      <div className="w-full flex flex-col lg:flex-row lg:items-center items-start justify-between p-4 md:p-0">
        <h2 className="text-lg font-semibold">Reports</h2>
        <div className="flex items-center justify-end flex-wrap gap-4">
          <div className="flex items-center gap-1 border rounded-lg px-3 py-1.5">
            <GoDotFill className="text-xs text-blue-500" />
            <span className="text-[11px] font-medium text-gray-500">Users</span>
          </div>
          <div className="flex items-center gap-1 border rounded-lg px-3 py-1.5">
            <GoDotFill className="text-xs text-black" />
            <span className="text-[11px] font-medium text-gray-500">Revenue</span>
          </div>
          <div className="flex items-center gap-1 border rounded-lg px-3 py-1.5">
            <GoDotFill className="text-xs text-yellow-500" />
            <span className="text-[11px] font-medium text-gray-500">
              Basic Plans
            </span>
          </div>
          <div className="flex items-center gap-1 border rounded-lg px-3 py-1.5">
            <GoDotFill className="text-xs text-green-500" />
            <span className="text-[11px] font-medium text-gray-500">
              Premium Plans
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[30vh] md:h-[50vh] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={'100%'}
            height={'100%'}
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            <XAxis dataKey="name" scale="band" className="text-[10px]" />
            <YAxis className="text-[10px]" />
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            <Area
              type="monotone"
              dataKey="amt"
              fill="#64B5AC"
              stroke="#8884d8"
              className="opacity-30"
            />
            <Bar dataKey="pv" barSize={30} fill="#64B5AC" className="" />
            <Line type="monotone" dataKey="uv" stroke="#64B5AC" />
            <Scatter dataKey="cnt" fill="#0bd4ba" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticalChart;
