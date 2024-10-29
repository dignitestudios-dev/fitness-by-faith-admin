import React from "react";
import { Link } from "react-router-dom";
import { ImagePlaceHolder } from "../../assets/export";
import { MdDelete } from "react-icons/md";


const TicketsList = ({mails, handleDelete, deleteLoadingId}) => {
  
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mails?.map((mail, index) => (
          <div className="bg-white rounded-lg p-4" key={index}>
            <div className="flex justify-between items-center">
              <div className="w-full flex items-center gap-3">
                {!mail?.userId?.profilePicture ? (
                  <img
                    src={ImagePlaceHolder}
                    alt=""
                    className="block w-14 h-14 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={mail?.userId?.profilePicture}
                    alt="mail"
                    className="block w-14 h-14 rounded-full object-cover"
                  />
                )}
                <div className="flex flex-col">
                  <h1 className="font-semibold">{mail?.userId?.fullName}</h1>
                  <p className="text-sm font-normal text-gray-400">
                    {mail?.userId?.email}
                  </p>
                </div>
              </div>
              {deleteLoadingId === mail?._id  ? (
                <div className="text-red-500">...</div>
              ) : (
                <div
                  onClick={() => handleDelete(mail?._id)}
                  className=" hover:bg-red-200 rounded-full p-2 cursor-pointer"
                >
                  <MdDelete className="text-red-600" />
                </div>
              )}
            </div>
            <div className="w-full pt-4">
              <p className="text-sm font-semibold mb-1.5">{mail?.title}</p>
              {/* <p className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs">
                {mail?.message}
              </p> */}
              <p className="text-sm">{mail?.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsList;
