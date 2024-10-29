import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import EditWorkoutForm from "../components/EditWorkout/EditWorkoutForm";
import { useParams } from "react-router-dom";

const WorkoutDetails = () => {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex itmes-center justify-between mb-6">
        {editable?(<h1 className="text-xl font-semibold">Edit Workout</h1>)
        :(<h1 className="text-xl font-semibold">Workout details</h1>)
        }
      </div>
      <EditWorkoutForm id={id} editable={editable} setEditable={setEditable} />

      {/* {editable && (
        <div className="w-full flex justify-end bg-white rounded-b-xl px-6 py-2 items-center gap-4">
          <button
            onClick={() => setEditable(false)}
            className={`${styles.bgColor} text-white text-sm font-medium px-3 py-2 rounded-lg`}
          >
            Update Workout
          </button>
          <button
            onClick={() => setEditable(false)}
            className={`bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg`}
          >
            Cancel
          </button>
        </div>
      )} */}
     
    </div>
  );
};

export default WorkoutDetails;
