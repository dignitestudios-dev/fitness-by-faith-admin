import React from "react";
import { Link } from "react-router-dom";
import { ImagePlaceHolder } from "../../assets/export";

const VideoCard = ({id, title, description, thumbnail}) => {
  return (
    // <div className="w-full relative">
    //   <Link to="/videos">
    //     <img src={thumbnail} alt="video" className="w-full h-[350px] object-cover rounded-2xl brightness-75 relative"/>
    //     <div className="w-full absolute bottom-4 px-4 flex flex-col gap-1">
    //       <h1 className="text-lg font-semibold text-white">
    //         {title}
    //       </h1>
    //       <p className="text-sm text-white">
    //         {description}
    //       </p>
    //     </div>
    //   </Link>
    // </div>
    <Link to= {`/video/${id}`} >
      <div className="w-full rounded-2xl bg-white">
        <img
          src={thumbnail || ImagePlaceHolder}
          alt=""
          className="w-full h-[350px] object-cover rounded-2xl brightness-75"
        />
        <div className="w-full px-4 flex flex-col justify-center items-start py-4 gap-2">
          <p className="text-xl font-medium text-[#64B5AC] text-ellipsis overflow-hidden whitespace-nowrap xl:max-w-[340px] lg:max-w-[240px]">{title}</p>
          <p className="text-xs font-normal text-ellipsis overflow-hidden whitespace-nowrap xl:max-w-[340px] lg:max-w-[240px]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
