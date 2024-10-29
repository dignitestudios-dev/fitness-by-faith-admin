import React, { useEffect, useState } from 'react'
import UserCard from '../components/Users/UserCard'
import { ErrorToaster } from '../components/Global/Toaster'
import Axios from "../axios"
import Loader from '../components/Global/Loader'
import Pagination from '../components/Global/Pagination'

const Users = () => {

  const [usersData, setUsersData] = useState([])
  const [pageDetails, setPageDetails] = useState({})
  const [loading, setLoading] = useState(false)

  const getAllUsers = async (pageNumber = 1, rows = 12) => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`users/getAll?pagination=true&page=${pageNumber}&limit=${rows}`);
      setUsersData(data?.data?.user);
      setPageDetails(data?.data?.pageDetails);
    } catch (error) {
      ErrorToaster(error?.message)
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    getAllUsers()
  },[])

  return (
    <div className='flex flex-col gap-6 min-h-screen'>
      <h1 className='text-xl font-semibold'>Users</h1>
      {loading?
      <div className="w-full h-[400px] pb-[400px]">
        <Loader/>
      </div> :
      <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {usersData?.map((user, index)=>(
          <UserCard key={index} id={user?._id} fullName={user?.fullName}
           email={user?.email} image={user?.profilePicture} target={user?.target}
           age={user?.age} chest={user?.chest} gender={user?.gender} height={user?.height}
           hip={user?.hip} waist={user?.waist} weight={user?.weight}/>
        ))}
      </div>}
      <div className="w-full flex justify-center mt-4">
        {!loading && (
          <Pagination page={pageDetails?.page} totalPages={pageDetails.pageCount} rowsPerPage={pageDetails.pageSize} onPageChange={getAllUsers}/>)}
      </div>
    </div>
  )
}

export default Users
