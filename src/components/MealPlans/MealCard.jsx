import React from "react";
import { MealImage } from "../../assets/export";
import { Link } from "react-router-dom";

const MealCard = ({id, title, instructions, numServing, prepTime, servingSize, url, category}) => {
  
  return (
    <Link to={`/meal/${id}`}>
      <div className="w-full h-auto md:h-auto lg:h-[265px] p-4 rounded-2xl flex flex-col md:flex-row gap-y-4 bg-white">
        <img src={url} alt="" className="h-[265px] md:h-full w-full md:w-[180px] object-cover" />
        <div className="h-full px-4 flex flex-col justify-center gap-3">
          <p className="text-xs font-normal text-[#64B5AC]">{category}</p>
          <h1 className="text-lg font-medium text-[#64B5AC]">
            {title}
          </h1>
          <p className="text-xs font-normal">
            {instructions?.length ? instructions[0] : "--"}
          </p>
          <div className="w-full grid grid-cols-2">
            <p className="text-[#7D7D7D] text-xs font-normal">Prep. Time</p>
            <p className="text-[#7D7D7D] text-xs font-normal">{prepTime}</p>
          </div>
          <div className="w-full grid grid-cols-2">
            <p className="text-[#7D7D7D] text-xs font-normal">Serving Size</p>
            <p className="text-[#7D7D7D] text-xs font-normal">{servingSize}</p>
          </div>
          <div className="w-full grid grid-cols-2">
            <p className="text-[#7D7D7D] text-xs font-normal">No. of Serving</p>
            <p className="text-[#7D7D7D] text-xs font-normal">{numServing}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
