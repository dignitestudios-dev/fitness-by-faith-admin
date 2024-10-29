import React, { Fragment, useRef, useState } from "react";
import { styles } from "../../styles/styles";
import { LuImagePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../axios";
import Loader from "../Global/Loader";
import { ErrorToaster, SuccessToaster } from "../Global/Toaster";
import Uploader from "../Global/Uploader";

const WorkoutCreationForm = () => {
  const navigate = useNavigate() 
  const [imgAddress, setImgAddress] = useState('')
  
  const [imgLoading, setImgLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [snippetLoading, setSnippetLoading] = useState({})
  const [snippetErr, setSnippetErr] = useState({})
  const [imageErrors, setImageErrors] = useState({});

  const [workError, setWorkError] = useState({
    imgErr: '',
    workoutTitleErr: '',
    workoutDescriptionErr: '',
    durationErr: '',
    numExercisesErr: '',
    restBetweenErr: '',
    subCategoryErr: '',
    categoryErr: '',
    bodyErr: '',
    ExImgErr:''
});

  //Fields
  const [formData, setFormData] = useState({
    workoutTitle: "",
    workoutDescription: "",
    duration: "",
    calorieBurn: "",
    numExercises: 1,
    restBetween: 1,
  });
 console.log(formData)
  // Handle Function
  const handleFieldChange = (fieldName, value) => {
    if(fieldName === "numExercises"){
      handleNumExercisesChange(value)
    }
    setWorkError({})
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const [selectedBodyPart, setSelectedBodyPart] = useState("Chest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  
  const [numExercises, setNumExercises] = useState(1);
  const [exerciseForms, setExerciseForms] = useState([{
    title: '', sets: 3, time: '', reps: '', calorieburn:'' ,isTimeBased: false, imagePreview: '', 
  }]);
  
  const [subCategory, setSubCategory] = useState("");

  const categories = {
    Yoga: [],
    Cardio: ["Bodyweight Cardio", "Equipment-Based Cardio"],
    Lifting: ["Free Weight", "Gym"],
  };

  const subCategories = categories[selectedCategory] || [];

  const handleSubCategory = (e) =>{
    setWorkError({})
    setSelectedSubCategory(e.target.value)
    if (e.target.value === "Bodyweight Cardio") return setSubCategory("BodyWeight") ;
    if (e.target.value === "Equipment-Based Cardio") return setSubCategory("Equipment");
    if (e.target.value === "Free Weight") return setSubCategory("FreeWeight");
    if (e.target.value === "Gym") return setSubCategory("Gym");
  }
  
  const handleCategoryChange = (event) => {
    setWorkError({})
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
    setSubCategory("");
  };

  const handleNumExercisesChange = (value) => {
    const newNumExercises = parseInt(value);
    setNumExercises(newNumExercises);
    if (newNumExercises >= 1 && newNumExercises <= 25 ) {
      setExerciseForms(
        
        Array(newNumExercises).fill({
          title: "",
          sets: 3,
          reps: "",
          restBetweenSets: "",
          calorieburn:"",
          image: null,
          time: "",
        })
      );
    }
  };

  const handleExerciseChange2 = (exerciseIndex, event) => {
    const updatedForms = [...exerciseForms];
    updatedForms[exerciseIndex] = {
      ...updatedForms[exerciseIndex],
      [event.target.name]: event.target.value,
    };
    setExerciseForms(updatedForms);
    setImageErrors({})
  };

  const handleExerciseImage = async (exerciseIndex, event) => {
    setImageErrors({});
    const updatedForms = [...exerciseForms];
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    // URL for the image preview
    const imagePreviewUrl = URL.createObjectURL(file);
    // updatedForms[exerciseIndex].imagePreview = imagePreviewUrl;

    try{
      setSnippetLoading(prevState => ({ ...prevState, [exerciseIndex]: { load: true } })); 
      const {data} = await Axios.post("media/upload/image", formData)
      if(data.status === 200){
        setSnippetErr(prevState => ({ ...prevState, [exerciseIndex]: { error: false } }));
        updatedForms[exerciseIndex] = {
          ...updatedForms[exerciseIndex],
          image: data?.data?.fileAddress,
          imagePreview: imagePreviewUrl
        };
        setExerciseForms(updatedForms);
      }
    }
    catch(err){
      console.log("🚀 ~ handleExerciseImage ~ err:", err)
      setSnippetErr(prevState => ({ ...prevState, [exerciseIndex]: { error: true } }));
    }
    finally{
      setExerciseForms(updatedForms);
      setSnippetLoading(prevState => ({ ...prevState, [exerciseIndex]: { load: false } }));
    }
  };

  const [exerciseList, setExerciseList] = useState([
    {
      title: "",
      sets: "",
      reps: "",
      restBetweenSets: "",
      image: null,
      time: "",
    },
  ]);

  const removeExerciseField = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      numExercises: prevFormData.numExercises - 1
    }));
    const updatedExerciseList = exerciseList.filter(
      (exercise, index) => index+1 !== id+1
    );
    const updatedExerciseForm = exerciseForms.filter(
      (exercise, index) => index+1 !== id+1
    );
    setExerciseList(updatedExerciseList);
    setExerciseForms(updatedExerciseForm)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const fieldsToValidate = [
      { field: "imgErr", value: imgAddress, message: "Upload Image" },
      { field: "workoutTitleErr", value: formData.workoutTitle, message: "Title required" },
      { field: "workoutDescriptionErr", value: formData?.workoutDescription, message: "Description required" },
      { field: "durationErr", value: formData.duration, message: "Duration required" },
      { field: "numExercisesErr", value: numExercises, message: "Number of exercises required" },
      { field: "restBetweenErr", value: formData?.restBetween, message: "Rest between sets required" },
      { field: "categoryErr", value: selectedCategory, message: "Category required" },
      { field: "subCategoryErr", value: selectedCategory==="Yoga"? "Gym":subCategory, message: "SubCategory required" },
      { field: "bodyErr", value: selectedBodyPart, message: "Body part selection required" },
      // { field: "ExImgErr", value: exerciseForms[0]?.image, message: "Upload image" },
  ];
  
  let errors = { ...workError };
  let hasError = false;
  
  fieldsToValidate.forEach(({ field, value, message }) => {
      if (!value) {
          errors[field] = message;
          hasError = true;
      }
  });
  
  if (hasError) {
      setWorkError(errors);
      return;
  }

  const mapError = {};
    
    exerciseForms.forEach((exercise, index) => {
      if (!exercise.image) {
        mapError[index] = "Please upload an image for exercise: "+ (index+1);
      }
      if(!exercise.calorieburn){
        mapError[index] = "Calories burn required for exercise: " + (index+1);
      }
      if(!exercise.title){
        mapError[index] = "Title required for exercise: " + (index+1);
      }
    });

    if (Object.keys(mapError).length > 0) {
      setImageErrors(mapError);
      return; 
    }
    
    const workoutData = {
      category: selectedCategory,
      title: formData.workoutTitle,
      subCategory: selectedCategory === "Yoga" ? "Gym" :subCategory,
      bodyPart: selectedBodyPart || "Chest", 
      description: formData.workoutDescription,
      sets: 3, 
      totalTime: formData.duration,
      breakTime: formData.restBetween,
      // calorieburn: formData.calorieBurn,
      thumbnail: imgAddress,
      exercises: exerciseForms.map(({ title, sets, time, reps, image,calorieburn }) => ({
        "name":title,
        "sets":3,
        // time,
        ...(time ?  { "time": +time } : { "reps": +reps }),
        "url":image,
        "category": "Legs",
        "calorieburn":+calorieburn,
        "isActive": true,
      }))
    };
    
    try {
      setBtnLoading(true)
      const {data} = await Axios.post("workout/create", workoutData);
      if (data.status === 200) {
        SuccessToaster(data?.message[0])
        setBtnLoading(false)
        navigate("/workout-plans")
      }
      else{
        setBtnLoading(false)
        ErrorToaster(data?.message[0])
      }
    } catch (error) {
      console.error("Failed to create workout:", error);
      ErrorToaster(error?.message);
    }
  };

  const fileInputRef = useRef(null);
  const handleProfileImg = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = async (e) => {
    setWorkError({})
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    if (file) {
      try {
        setImgLoading(true);
  
        const {data} = await Axios.post("media/upload/image", formData,);
        if(data?.status === 200){
          setImgAddress(data?.data?.fileAddress);
          setImgLoading(false);
        }
      } catch (error) {
        setImgLoading(false);
        console.error("Error->", error.message);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-6">
      <form
        onSubmit={(e)=>handleSubmit(e)}
        className="w-full flex flex-col items-start gap-4"
      >
        <div className="w-full">
          {imgLoading ? (
            <div
            onClick={handleProfileImg}
            className="w-full h-60 md:h-80 bg-white border border-[#eaeaea] cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
          >
            <Uploader />
          </div>
          ) : (
            <div
              onClick={handleProfileImg}
              className="w-full h-60 md:h-80 bg-white border border-[#eaeaea] cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
            >
              <input
                ref={fileInputRef}
                id="cat-image-add"
                className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleProfileChange(e)}
              />
              {imgAddress ? (
                <img
                  src={imgAddress}
                  className="w-full h-full rounded-xl object-contain"
                />
              ) : (
                <div className="w-auto flex flex-col gap-3 justify-center items-center">
                  <LuImagePlus className="text-4xl font-medium text-gray-400" />
                  <span className="text-sm font-normal text-gray-400">
                    Please upload workout thumbnail.
                  </span>
                </div>
              )}
            </div>
          )}
          {workError.imgErr && (<p className="text-red-600 text-xs ">{workError?.imgErr}</p>)}
        </div>

        <div className="w-full flex flex-col items-start gap-1">
          <label className="text-sm font-medium">Workout Title</label>
          <input
            type="text"
            className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.workoutTitleErr && "ring-red-600 border-red-600 outline-red-600"} focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]`}
            value={formData.workoutTitle}
            onChange={(e) => handleFieldChange("workoutTitle", e.target.value)}
          />
          {workError?.workoutTitleErr && (<p className="text-red-600 text-xs ">{workError?.workoutTitleErr}</p>)}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Workout Category</label>
            <select
              className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.categoryErr && "ring-red-600 border-red-600 outline-red-600"} focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]`}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {workError?.categoryErr && (<p className="text-red-600 text-xs ">{workError?.categoryErr}</p>)}
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Sub-Category</label>
            <select
              className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.subCategoryErr ?"ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
              value={selectedSubCategory}
              onChange={(e) => handleSubCategory(e)}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
            {workError?.subCategoryErr && (<p className="text-red-600 text-xs ">{workError?.subCategoryErr}</p>)}
          </div>
        </div>

        {selectedSubCategory === "Free Weight" ||
        selectedSubCategory === "Gym" ? (
          <div className="w-full">
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-sm font-medium">Sub-category</label>
              <select
                className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.bodyErr ?"ring-red-600 border-red-600 outline-red-600":
                  "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
                value={selectedBodyPart}
                onChange={(e) => {setSelectedBodyPart(e.target.value);}}
              >
                <option value="">Select Body Part</option>
                <option value="Biceps">Biceps</option>
                <option value="Triceps">Triceps</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Shoulder">Shoulders</option>
                <option value="Legs">Legs</option>
              </select>
              {workError?.bodyErr && (<p className="text-red-600 text-xs ">{workError?.bodyErr}</p>)}
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
            <label className="text-sm font-medium">
              Estimated Calorie Burn
            </label>
            <input
              type="number"
              className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.calorieBurnErr ?"ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
              value={formData.calorieBurn}
              onChange={(e) => handleFieldChange("calorieBurn", e.target.value)}
              min={1}
            />
            {workError?.calorieBurnErr && (<p className="text-red-600 text-xs ">{workError?.calorieBurnErr}</p>)}
          </div> */}
          <div className="w-full col-span-2 md:col-span-1 flex flex-col gap-1 items-start">
            <label className="text-sm font-medium">Rest Between Sets</label>
            <input
              type="number"
              className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.restBetweenErr?"ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
              id="restBetween"
              placeholder="Enter time in seconds"
              value={formData.restBetween}
              onChange={(e) => handleFieldChange("restBetween", e.target.value)}
              min={1}
            />
            {workError?.restBetweenErr && (<p className="text-red-600 text-xs ">{workError?.restBetweenErr}</p>)}
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
            <label className="text-sm font-medium">
              Duration <span className="text-xs text-gray-400">(minutes)</span>
            </label>
            <input
              type="number"
              className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.durationErr?"ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
              value={formData.duration}
              onChange={(e) => handleFieldChange("duration", e.target.value)}
              min={1}
            />
            {workError?.durationErr && (<p className="text-red-600 text-xs ">{workError?.durationErr}</p>)}
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-1">
          <label className="text-sm font-medium">Workout Description</label>
          <textarea
            className={`w-full border rounded-lg px-3 py-3 text-sm ${workError?.workoutDescriptionErr?"ring-red-600 border-red-600 outline-red-600":
              "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
            value={formData.workoutDescription}
            rows={"5"}
            onChange={(e) => handleFieldChange("workoutDescription", e.target.value)}
          ></textarea>
          {workError?.workoutDescriptionErr && (<p className="text-red-600 text-xs ">{workError?.workoutDescriptionErr}</p>)}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="w-full col-span-2 md:col-span-1 flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Total Exercises</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              id="numExercises"
              value={formData.numExercises}
              onChange={(e) => handleFieldChange("numExercises", e.target.value)}
              min={1}
            />
            {workError.numExercisesErr && (<p className="text-red-600 text-xs ">{workError.numExercisesErr}</p>)}
          </div>
        </div>

        {exerciseForms.map((exercise, index) => (
          <div key={index} className="w-full flex flex-col items-start gap-4">
            <span className="-mb-2">Exercise {index + 1}</span>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1 items-start">
                <label className="text-sm font-medium flex items-center justify-start gap-4">
                  <span>Exercise {index + 1} Title</span>
                  {index >= 1 ? (
                    <button
                      type="button"
                      className="text-red-600 font-medium text-xs"
                      onClick={() => removeExerciseField(index)}
                    >
                      Delete Exercise
                    </button>
                  ) : (
                    <></>
                  )}
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                  onChange={(event) => handleExerciseChange2(index, event)}
                  value={exercise.title || ""}
                />
              </div>
              <div className="w-full flex flex-col gap-1 items-start">
                <label className="text-sm font-medium">Sets</label>
                <input
                disabled
                  type="number"
                  className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                  name="sets"
                  onChange={(event) => handleExerciseChange2(index, event)}
                  value={exercise.sets || ""}
                  min={1}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full flex flex-col gap-1 items-start">
                <div className="w-full flex items-center justify-between gap-4">
                  <label className="text-sm font-medium">
                    {exercise.isTimeBased ? "Time Duration" : "No. Reps"}
                  </label>
                  {/* <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="timeBased"
                      id="timeBased"
                      checked={isTimeBased}
                      onChange={(e) => setIsTimeBased(e.target.checked)}
                    />
                    <label htmlFor="timeBased" className="text-sm">
                      Is the exercise time based?
                    </label>
                  </div> */}
                </div>
                {exercise.isTimeBased ? (
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    placeholder="Enter time in seconds"
                    name="time"
                    value={exercise.time || ""}
                    onChange={(event) => handleExerciseChange2(index, event)}
                    min={1}
                  />
                ) : (
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    placeholder="Enter no. of reps"
                    name="reps"
                    value={exercise.reps || ""}
                    onChange={(event) => handleExerciseChange2(index, event)}
                    min={1}
                  />
                )}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name="timeBased"
                    id="timeBased"
                    checked={exercise.isTimeBased}
                    onChange={(e) => {
                      const updatedForms = [...exerciseForms];
                      updatedForms[index].isTimeBased = e.target.checked;
                      setExerciseForms(updatedForms);
                    }}
                  />
                  <label htmlFor="timeBased" className="text-xs">
                    Is the exercise time based?
                  </label>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 items-start">
                <label className="text-sm font-medium">Calories Burn</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                  name="calorieburn"
                  onChange={(event) => handleExerciseChange2(index, event)}
                  value={exercise.calorieburn || ""}
                  min={1}
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="w-full flex flex-col gap-1 items-start">
                <label className="text-sm font-medium">Exercise Image</label>
                <div className="w-full flex justify-between ">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full h-12 border rounded-lg mr-2 px-3 py-2 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    onChange={(event) => handleExerciseImage(index, event)}
                  />
                  {exercise.imagePreview && (
                    <Fragment>
                      {snippetLoading[index]?.load ? (
                        <div>uploading...</div>
                      ) : (
                        <>
                        {snippetErr[index]?.error ?
                         <p className="text-red-700 text-[12px] pl-1">Upload failed: Make sure correct file type</p>:
                        <img
                        src={exercise.imagePreview}
                        alt="Preview"
                        className=" ml-2 w-14 h-14 object-cover"
                      />
                        }
                        </>
                      )}
                    </Fragment>
                  )}
                </div>
              {imageErrors[index] && (<p className="text-red-600 text-xs ">{imageErrors[index]}</p>)}
              </div>
            </div>
          </div>
        ))}

        <div className="w-full flex items-center justify-end gap-4 py-4">
          <button
          disabled={btnLoading}
            type="submit"
            className={`${styles.bgColor} text-white font-medium text-sm px-4 py-2 rounded-lg`}
          >
            {btnLoading ? "Creating... " : "Create Workout"}
          </button>
          <Link
            to="/workout-plans"
            className={`bg-red-500 text-white font-medium text-sm px-4 py-2 rounded-lg`}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default WorkoutCreationForm;
