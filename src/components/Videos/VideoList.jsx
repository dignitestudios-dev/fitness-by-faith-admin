import React, { Fragment, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Axios from "../../axios";
import Loader from "../Global/Loader";
import Pagination from "../Global/Pagination";

const VideoList = () => {
  const [workoutVideo, setWorkoutVideo] = useState([])
  const [pageDetails, setPageDetails] = useState({})
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(false)

  const getVideos = async (pageNumber = 1, rows = 9, filter) => {
    try {
      let url = "";
      setLoading(true);
      if (filter === 'All' || filter == undefined  ) {
        url = `video/getAll?pagination=true&page=${pageNumber}&pageSize=${rows}`
      }
      else{
        url = `video/getAll?pagination=true&page=${pageNumber}&pageSize=${rows}&category=${filter}`
      }
      const { data } = await Axios.get(url);
      setWorkoutVideo(data?.data?.data);
      setPageDetails(data?.data?.pageDetails);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    getVideos(1, 9, filter);
  };

  useEffect(()=>{
    getVideos()
  },[])

  return (
    <div className="w-full mt-6">
      <div className="w-full flex items-center justify-start gap-4">
        <button
          className={`text-[12px] px-4 py-1 rounded-full ${selectedFilter === "All"? "bg-[#64B5AC] text-white"
              : "bg-gray-200 text-black"} font-medium transition-all duration-300`}
          onClick={() => handleFilterClick("All")}
        >
          All
        </button>
        <button className={`text-[12px] ${selectedFilter === "Yoga"? "bg-[#64B5AC] text-white"
              : "bg-gray-200 text-black"} px-4 py-1 rounded-full hover:bg-[#64B5AC] hover:text-white font-medium transition-all duration-300`}
          onClick={() => handleFilterClick("Yoga")}
        >
          Yoga
        </button>
        <button
          className={`text-[12px] ${ selectedFilter === "Cardio" ? "bg-[#64B5AC] text-white": "bg-gray-200 text-black"
          } px-4 py-1 rounded-full hover:bg-[#64B5AC] hover:text-white font-medium transition-all duration-300`}
          onClick={() => handleFilterClick("Cardio")}
        >
          Cardio
        </button>
        <button
          className={`text-[12px] ${selectedFilter === "Lifting" ? "bg-[#64B5AC] text-white"
              : "bg-gray-200 text-black"} px-4 py-1 rounded-full hover:bg-[#64B5AC] hover:text-white font-medium transition-all duration-300`}
          onClick={() => handleFilterClick("Lifting")}
        >
          Lifting
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutVideo?.map((video, index) => (
              <VideoCard
                key={index}
                id={video._id}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
              />
            ))}
          </div>
          <div className="w-full flex justify-center mt-4">
            <Pagination
              page={pageDetails?.page}
              totalPages={pageDetails?.pageCount}
              rowsPerPage={pageDetails?.pageSize}
              selectedFilter={selectedFilter}
              onPageChange={getVideos}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default VideoList;
