import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const RevenueChart = ({revenue}) => {
  const [chartData, setChartData] = useState([
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  ]);

  useEffect(() => {
    if (revenue && revenue.length > 0) {
      const chartsData = revenue.map((item) => ({
        name: `Month ${item._id.month}`,
        pv: item.totalSubscriptions,
        uv: item.totalPrice,
      }));

      setChartData(chartsData);
    }
  }, [revenue]);
  
  return (
    <div className='w-full bg-white rounded-xl p-6 lg:h-[60vh]'>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={'100%'}
          height={'100%'}
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="2 2"/>
          <XAxis dataKey="name" className='text-[10px]'/>
          <YAxis className='text-[10px]'/>
          {/* <Tooltip /> */}
          <Area type="monotone" dataKey="uv" stroke="#64B5AC" fill="#52c5b5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueChart
