import React, { useState } from "react";
import VideoDetailsAndEdit from "../components/VideoDetailsAndEdit/VideoDetailsAndEdit";
import { useParams } from "react-router-dom";

const VideoDetailsPage = () => {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);

  return (
    <div className="w-full flex flex-col items-start gap-6 min-h-screen">
      {editable?<h1 className="text-xl font-semibold">Edit Video</h1>
      :<h1 className="text-xl font-semibold">Video Details</h1>}
      <VideoDetailsAndEdit id={id} editable={editable} setEditable={setEditable}/>
    </div>
  );
};

export default VideoDetailsPage;
