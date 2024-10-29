import React, { Fragment, useEffect, useState } from 'react'
import RevenueChart from '../components/Revenue/RevenueChart'
import List from '../components/Revenue/List'
import { ErrorToaster } from '../components/Global/Toaster'
import Axios  from '../axios'
import Loader from '../components/Global/Loader'

const Revenue = () => {

  const [revenue, setRevenue] = useState([])
  const [loading, setLoading] = useState(false)

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
    getRevenue()
  },[])

  return (
    <div className='flex flex-col items-start gap-4'>
      <h1 className='text-xl font-semibold'>Revenue</h1>
      {loading?(
        <Loader/>
      ):(
        <Fragment>
          <RevenueChart revenue={revenue?.graphData}/>
          <List subscription={revenue?.userSubscription}/>
        </Fragment>
      )}
    </div>
  )
}

export default Revenue
