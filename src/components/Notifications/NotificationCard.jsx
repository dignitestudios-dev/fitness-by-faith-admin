import React from "react";
import { NotificationIcon } from "../../assets/export";
import { Logo } from "../../assets/export";

const NotificationCard = ({notification}) => {
  const date = new Date(notification?.createdAt);
  const options = { weekday: "long", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="w-full flex items-center px-4 py-2 bg-gray-50 rounded-lg gap-3 min-h-[120px]">
      <div className="w-[100px] xl:w-[200px] h-[80px] hidden justify-center lg:flex items-center rounded-lg bg-gray-200">
      <img src={Logo} alt="" className="h-[50px]  object-cover" />
      </div>
      <div className="flex flex-col w-full gap-1 relative xl:min-w-[420px]">
        <div className="w-full flex justify-between items-center">
        <p className="text-base font-medium">{notification?.title}</p>
        <span className=" text-xs font-normal">{formattedDate}</span>
        {/* <div className="flex items-center gap-6">
            <span className="text-xs font-medium">Sent to: All</span>
            </div> */}
        </div>
            <p className="text-sm text-gray-400">{notification?.message}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
