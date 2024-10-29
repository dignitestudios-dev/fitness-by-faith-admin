import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";

const ConfirmationDialog = ({ showModal, onclick , action , title, text, loading }) => {
  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 px-4 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
        <div className="w-full lg:w-[430px] p-4 lg:px-6 lg:py-5 h-[220px] bg-white rounded-lg relative flex flex-col justify-between">
          <button
            type="button"
            className="absolute top-5 right-6"
            onClick={onclick}
          >
            <IoIosCloseCircle className="w-6 h-6 text-gray-400" />
          </button>
          <div className='flex-col justify-center mx-auto mt-16 text-center'>
          <h1 className="font-semibold text-xl">{title}</h1>
          <p className='pt-2'>{text}</p>
          <button
          disabled={loading}
           className='bg-red-600 text-white px-4 py-2 mx-1 rounded-lg text-sm font-medium mt-2 hover:bg-red-500'
           onClick={action}
           >{loading? "Deleting": "Delete"}</button>
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmationDialog