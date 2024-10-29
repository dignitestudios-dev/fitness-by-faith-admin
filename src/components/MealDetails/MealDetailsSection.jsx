import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";

const MealDetailsSection = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* meal details */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="col-span-2 lg:col-span-1">
          <div className="w-full md:w-96 lg:w-[500px] ">
            <img
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="w-full rounded-xl lg:h-[350px]"
            />
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <div className="w-full h-full flex flex-col justify-center gap-4">
            <h1 className="text-xl font-semibold text-[#64B5AC]">
              Grilled Chicken Salad
            </h1>
            <p className="text-sm font-normal text-gray-400">1 Bowl (300 g)</p>

            <div className="w-full h-auto relative mt-4 flex flex-col items-start justify-start gap-4">
              {/* <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-medium text-gray-400">Carbs</p>
                <CircularProgressbar
                  className="w-12"
                  value={60}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    pathColor: `rgb(253 224 71)`,
                    textColor: "rgb(253 224 71)",
                    trailColor: "rgb(254 240 138)",
                    backgroundColor: "rgb(253 224 71)",
                  })}
                />
                <p className="text-[10px] font-medium text-gray-400">31.1g</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-medium text-gray-400">Fat</p>
                <CircularProgressbar
                  className="w-12"
                  value={60}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    pathColor: `rgb(244 63 94)`,
                    trailColor: "rgb(253 164 175)",
                  })}
                />
                <p className="text-[10px] font-medium text-gray-400">31.1g</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-medium text-gray-400">Protien</p>
                <CircularProgressbar
                  className="w-12"
                  value={60}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    pathColor: `rgb(217 70 239)`,
                    trailColor: "rgb(240 171 252)",
                  })}
                />
                <p className="text-[10px] font-medium text-gray-400">31.1g</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-medium text-gray-400">
                  Calories
                </p>
                <CircularProgressbar
                  className="w-12"
                  value={60}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    pathColor: `rgb(139 92 246)`,
                    trailColor: "rgb(196 181 253)",
                  })}
                />
                <p className="text-[10px] font-medium text-gray-400">31.1g</p>
              </div> */}
              <div className="flex items-center gap-x-10">
                <p className="text-sm font-normal text-gray-400">Carbs</p>
                <p className="text-sm font-normal text-gray-400">31.1g</p>
              </div>
              <div className="flex items-center gap-x-10">
                <p className="text-sm font-normal text-gray-400">Fat</p>
                <p className="text-sm font-normal text-gray-400">31.1g</p>
              </div>
              <div className="flex items-center gap-x-10">
                <p className="text-sm font-normal text-gray-400">Protien</p>
                <p className="text-sm font-normal text-gray-400">31.1g</p>
              </div>
              <div className="flex items-center gap-x-10">
                <p className="text-sm font-normal text-gray-400">Calories</p>
                <p className="text-sm font-normal text-gray-400">31.1g</p>
              </div>
            </div>

            <div className="flex items-start justify-start gap-4 mt-4">
              <div className="flex flex-col items-center gap-1 border-r pr-4">
                <p className="text-sm font-normal">Prep. Time</p>
                <p className="text-sm font-normal text-gray-400">15 mins</p>
              </div>
              <div className="flex flex-col items-center gap-1 border-r px-4">
                <p className="text-sm font-normal">Serving Size</p>
                <p className="text-sm font-normal text-gray-400">15 mins</p>
              </div>
              <div className="flex flex-col items-center gap-1 px-4">
                <p className="text-sm font-normal">No. of Serving</p>
                <p className="text-sm font-normal text-gray-400">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions and Ingredients */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full flex flex-col gap-3 col-span-2 lg:col-span-1">
          <h1 className="font-semibold text-lg">Ingredients</h1>
          <ul className="list-disc px-4 flex flex-col gap-1">
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-3 col-span-2 lg:col-span-1 mt-6 md:mt-0">
          <h1 className="font-semibold text-lg">Instructions</h1>
          <ul className="list-disc px-4 flex flex-col gap-1">
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
            <li className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex justify-end gap-3">
        <Link
          to="/update-meal/1234"
          className="text-sm font-medium bg-[#64B5AC] text-white px-4 py-2 rounded-lg"
        >
          Edit Meal
        </Link>
        <button className="text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-lg">
          Delete Meal
        </button>
      </div>
    </div>
  );
};

export default MealDetailsSection;
