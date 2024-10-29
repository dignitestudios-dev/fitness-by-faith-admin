import React, { Fragment, useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'

const NotificationList = ({notifications}) => {
  
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
      {notifications?.map((notification, index)=>(
        <NotificationCard key={index} notification={notification} />
      ))}
    </div>
  );
}

export default NotificationList
