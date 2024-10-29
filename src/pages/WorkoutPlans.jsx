import React, { Fragment, useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutPlans/WorkoutCard";
import { Link } from "react-router-dom";
import { styles } from "../styles/styles";
import Axios from "../axios";
import Loader from "../components/Global/Loader";
import Pagination from "../components/Global/Pagination";

const WorkoutPlans = () => {

  const [workoutData, setWorkoutData] = useState([])
  const [pageDetails, setPageDetails] = useState({})
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(false)

  const rowsPerPage = 9;


  const getWorkouts = async (pageNumber = 1, rows = 9, filter) => {
    try {
      let url = "";
      setLoading(true);
      if (filter === 'All' || filter == undefined  ) {
        url = `workout/getAll?pagination=true&page=${pageNumber}&pageSize=${rows}`
      }
      else{
        url = `workout/getAll?pagination=true&page=${pageNumber}&pageSize=${rows}&category=${filter}`
      }
      const { data } = await Axios.get(url);
      setWorkoutData(data?.data?.data);
      setPageDetails(data?.data?.pageDetails);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    getWorkouts(1, 9, filter);
  };

  useEffect(()=>{
    getWorkouts()
  },[])

  return (
    <div className="min-h-screen flex flex-col gap-6">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-xl font-semibold">Workout Plans</h1>
            <Link
              to="/create-workout"
              className={`${styles.bgColor} text-white text-xs font-medium px-4 py-3 rounded-xl`}
            >
              Create Workout
            </Link>
          </div>
          <div className="w-full flex items-center justify-start gap-4">
            <button className={`text-[12px] px-4 py-1 rounded-full ${
                selectedFilter === "All"? "bg-[#64B5AC] text-white" : "bg-gray-200 text-black"
              } font-medium transition-all duration-300`}
              onClick={() => handleFilterClick("All")}
            >
              All
            </button>
            <button
          className={`text-[12px] ${selectedFilter === 'Yoga' ? 'bg-[#64B5AC] text-white' : 'bg-gray-200 text-black'} px-4 py-1 rounded-full hover:bg-[#64B5AC] hover:text-white font-medium transition-all duration-300`}
          onClick={() => handleFilterClick('Yoga')}
        >
          Yoga
        </button>
        <button
          className={`text-[12px] ${selectedFilter === 'Cardio' ? 'bg-[#64B5AC] text-white' : 'bg-gray-200 text-black'} px-4 py-1 rounded-full hover:bg-[#64B5AC] hover:text-white font-medium transition-all duration-300`}
          onClick={() => handleFilterClick('Cardio')}
        >
          Cardio
        </button>
        <button
          className={`text-[12px] ${selectedFilter === 'Lifting' ? 'bg-[#64B5AC] text-white' : 'bg-gray-200 text-black'} px-4 py-1 rounded-full hover:bg-[#64B5AC] hover:text-white font-medium transition-all duration-300`}
          onClick={() => handleFilterClick('Lifting')}
        >
          Lifting
        </button>
          </div>
          {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutData?.map((workOut, index) => (
              <WorkoutCard
                key={index}
                id={workOut._id}
                title={workOut.title}
                description={workOut.description}
                thumbnail={workOut.thumbnail}
              />
            ))}
          </div>
          <div className="w-full flex justify-center mt-4">
            <Pagination
              page={pageDetails?.page}
              totalPages={pageDetails?.pageCount}
              rowsPerPage={pageDetails?.pageSize}
              selectedFilter={selectedFilter}
              onPageChange={getWorkouts}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default WorkoutPlans;
