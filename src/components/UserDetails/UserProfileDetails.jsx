import React from "react";
import { ImagePlaceHolder } from "../../assets/export";

const UserProfileDetails = ({data}) => {
  
  return (
    <div className="flex flex-col gap-6 bg-white p-6 lg:p-10 rounded-xl w-full lg:w-1/2">
      <div className="flex items-center gap-4">
        {!data?.image ? 
        <img src={ImagePlaceHolder} alt="" className="block rounded-full w-20 h-20 object-cover"/> :
        <img
          src={data?.image}
          alt="user"
          className="block rounded-full w-24 h-20 object-cover"
        />
        }
        <div className="w-full flex items-center justify-between">
        <h1 className="text-base font-medium">{data?.fullName}</h1>
        <span className="text-xs bg-emerald-100 px-3 py-1 rounded-full font-medium text-emerald-600">{data?.target}</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Name: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
                {data?.fullName}
            </div>
        </div>
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Email: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
                {data?.email}
            </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Gender: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
                {data?.gender}
            </div>
        </div>
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Age: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
            {data?.age}
            </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Weight: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
              {data?.weight} Kg
            </div>
        </div>
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Height: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
            {data?.height} Ft
            </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Chest: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
            {data?.chest} cm
            </div>
        </div>
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Waist: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
                {data?.waist} cm
            </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium">Hip: </p>
            <div className="w-full py-3 rounded-lg bg-gray-50 text-center text-sm text-gray-400">
            {data?.hip} cm
            </div>
        </div>
        <div className="col-span-2 md:col-span-1">
        </div>
      </div>

    </div>
  );
};

export default UserProfileDetails;
