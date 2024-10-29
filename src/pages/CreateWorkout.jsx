import WorkoutCreationForm from "../components/CreateWorkout/WorkoutCreationForm";

const CreateWorkout = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full flex flex-col lg:flex-row mb-6 lg:mb-2 items-start justify-between">
        <h1 className="text-xl font-semibold mb-6">Create Workout Plan</h1>
       
      </div>
      <WorkoutCreationForm />
    </div>
  );
};

export default CreateWorkout;
