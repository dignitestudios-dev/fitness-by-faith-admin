import React from "react";
import VideoList from "../components/Videos/VideoList";
import { Link } from "react-router-dom";
import { styles } from "../styles/styles";

const Videos = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Workout Videos</h1>
        <Link
          to="/videos/create-workout"
          className={`${styles.bgColor} text-white font-medium text-sm rounded-lg px-4 py-2`}
        >
          Upload Video
        </Link>
      </div>
      <VideoList />
    </div>
  );
};

export default Videos;
