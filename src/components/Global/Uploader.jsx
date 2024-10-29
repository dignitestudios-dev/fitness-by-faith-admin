import React from 'react'

const Uploader = () => {
  return (
    <div className="flex justify-center items-center w-full gap-2 py-10">
      <div>
        <p className="text-[#64B5AC] text-sm">Uploading</p>
      </div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-[#64B5AC]"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-[#64B5AC]"></div>
      <div className="w-2 h-2 rounded-full animate-pulse bg-[#64B5AC]"></div>
    </div>
  );
}

export default Uploader