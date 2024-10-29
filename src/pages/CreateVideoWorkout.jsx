import React from "react";
import CreateVideoBasedWorkoutForm from "../components/CreateWorkout/CreateVideoBasedWorkoutForm";

const CreateVideoWorkout = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Upload Workout Video</h1>
      <CreateVideoBasedWorkoutForm />
    </div>
  );
};

export default CreateVideoWorkout;
