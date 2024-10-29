import React from 'react'
import UserProfileDetails from '../components/UserDetails/UserProfileDetails'
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
  const {state} = useLocation();
  
  return (
    <div className='min-h-screen flex flex-col gap-6'>
      <h1 className='text-xl font-semibold'>User Profile</h1>
      <UserProfileDetails data={state}/>
    </div>
  )
}

export default UserDetails
