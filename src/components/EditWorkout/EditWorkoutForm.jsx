import React, { Fragment, useEffect, useRef, useState } from "react";
import { styles } from "../../styles/styles";
import { LuImagePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../../axios";
import Loader from "../Global/Loader";
import { ErrorToaster, SuccessToaster } from "../Global/Toaster";
import Uploader from "../Global/Uploader";
import ConfirmationDialog from "../Global/ConfirmationDialog";

const EditWorkoutForm = ({ id, editable, setEditable }) => {
  const navigate = useNavigate()
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [calorieBurn, setCalorieBurn] = useState("");
  const [totalExercises, setTotalExercises] = useState("");
  const [restBetween, setRestBetween] = useState(0);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [snippetLoading, setSnippetLoading] = useState({});
  const [snippetErr, setSnippetErr] = useState({});
  const [imgLoading, setImgLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [deleteLoad, setDeleteLoad] = useState(false)

  const [imgAddress, setImgAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");
  console.log("🚀 ~ EditWorkoutForm ~ selectedBodyPart:", selectedBodyPart)

  const [showModal, setShowModal] = useState(false);
  const handleModal = (e) => {
    e.preventDefault()
    setShowModal(!showModal);
  };

  const [exerciseList, setExerciseList] = useState([
    { id: "", title: "", sets: 3, reps: "", restBetweenSets: "", calorieburn:"", image: null },
  ]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
  };

  const categories = {
    Yoga: [],
    Cardio: ["Bodyweight Cardio", "Equipment-Based Cardio"],
    Lifting: ["Free Weight", "Gym"],
  };

  const subCategories = categories[selectedCategory] || [];

  const handleSubCategory = (e) => {
    setSelectedSubCategory(e.target.value);
    if (e.target.value === "Bodyweight Cardio")
      return setSubCategory("BodyWeight");
    if (e.target.value === "Equipment-Based Cardio")
      return setSubCategory("Equipment");
    if (e.target.value === "Free Weight") return setSubCategory("FreeWeight");
    if (e.target.value === "Gym") return setSubCategory("Gym");
  };

  const [nextId, setNextId] = useState(2);

  const addExerciseField = () => {
    const newTotalExercises = parseInt(totalExercises + 1);
    if (newTotalExercises >= 1) {
      setTotalExercises(newTotalExercises);
      const updatedExerciseList = [...exerciseList];

      if (newTotalExercises > exerciseList.length) {
        for (let i = exerciseList.length; i < newTotalExercises; i++) {
          updatedExerciseList.push({
            id: Date.now() + i,
            title: "",
            sets: 3,
            reps: "",
            time: "",
            restBetweenSets: "",
            image: null,
            isTimeBased: false,
          });
        }
      } else {
        updatedExerciseList.length = newTotalExercises;
      }

      setExerciseList(updatedExerciseList);
    }
  };

  // const addExerciseField = () => {
  //   setExerciseList([
  //     ...exerciseList,
  //     {
  //       id: nextId,
  //       title: "",
  //       sets: "",
  //       reps: "",
  //       restBetweenSets: "",
  //       image: null,
  //     },
  //   ]);
  //   setNextId(nextId + 1);
  // };

  const removeExerciseField = (id) => {
    const updatedExerciseList = exerciseList.filter(
      (exercise, index) => id !== exercise.id
    );
    setExerciseList(updatedExerciseList);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...exerciseList];
    updatedExercises[index][field] = value;
    setExerciseList(updatedExercises);
  };

  const handleTimeBasedChange = (index, isChecked) => {
    const updatedExercises = [...exerciseList];
    updatedExercises[index].isTimeBased = isChecked;
    setExerciseList(updatedExercises);
  };

  const handleImageChange = async (index, event) => {
    const file = event.target.files[0];
    setImageErrors(prevState => {
      const updatedErrors = { ...prevState };
      delete updatedErrors[index];
      return updatedErrors;
    });
    if (file) {
      try {
        setSnippetLoading((prevState) => ({
          ...prevState,
          [index]: { load: true },
        }));
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await Axios.post("media/upload/image", formData);

        if (data.status === 200) {
          const updatedExercises = [...exerciseList];
          updatedExercises[index].image = data?.data?.fileAddress;
          setExerciseList(updatedExercises);
          setSnippetErr((prevState) => ({
            ...prevState,
            [index]: { error: false },
          }));
          setSnippetLoading((prevState) => ({
            ...prevState,
            [index]: { load: false },
          }));
        }
      } catch (error) {
        console.log(error);
        setSnippetErr((prevState) => ({
          ...prevState,
          [index]: { error: true },
        }));
        setSnippetLoading((prevState) => ({
          ...prevState,
          [index]: { load: false },
        }));
      }
    }
  };

  const handleTotalExercisesChange = (event) => {
    const newTotalExercises = parseInt(event.target.value);
    setTotalExercises(newTotalExercises);
    if (newTotalExercises >= 1) {
      const updatedExerciseList = [...exerciseList];

      if (newTotalExercises > exerciseList.length) {
        for (let i = exerciseList.length; i < newTotalExercises; i++) {
          updatedExerciseList.push({
            id: Date.now() + i,
            title: "",
            sets: "",
            reps: "",
            time: "",
            restBetweenSets: "",
            image: null,
            isTimeBased: false,
          });
        }
      } else {
        updatedExerciseList.length = newTotalExercises;
      }

      setExerciseList(updatedExerciseList);
    }
  };

  // image uploading and image preview
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleProfileImg = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setImage(base64String);
        setImgLoading(true);

        const { data } = await Axios.post("media/upload/image", formData);
        if (data?.status === 200) {
          setImgAddress(data?.data?.fileAddress);
          setImgLoading(false);
        }
      } catch (error) {
        setImgLoading(false);
        console.error("Error->", error.message);
      }
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Get base64 string without data:image part
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    
    exerciseList.forEach((exercise, index) => {
      if (!exercise.image) {
        errors[index] = "Please upload an image for this exercise.";
      }
      if(!exercise.title){
        errors[index] = "Exercise title required";
      }
      if(!exercise.calorieburn){
        errors[index] = "Calories burn required";
      }
      if(!exercise.reps){
        errors[index] = "No. of reps required";
      }
    });

    if (Object.keys(errors).length > 0) {
      setImageErrors(errors);
      return; 
    }

    const workoutData = {
      category: selectedCategory,
      title: workoutTitle,
      subCategory: subCategory,
      bodyPart: selectedBodyPart || "Chest",
      description: workoutDescription,
      sets: 3,
      totalTime: duration,
      breakTime: restBetween,
      // calorieburn: calorieBurn,
      thumbnail: imgAddress,
      exercises: exerciseList?.map(({ title, sets, time, reps, image, calorieburn }) => ({
        name: title,
        sets: 3,
        // time,
        ...(reps ? { reps: +reps } : { time: +time }),
        url: image,
        category: "Legs",
        calorieburn: +calorieburn,
        isActive: true,
      })),
    };

    try {
      setBtnLoading(true);
      const { data } = await Axios.put(`workout/update/${id}`, workoutData);
      if (data.status === 200) {
        SuccessToaster(data.message[0]);
        setBtnLoading(false);
        setEditable(false);
        // navigate("/workout-plans");
      } else {
        setBtnLoading(false);
        ErrorToaster(data.message[0]);
      }
    } catch (error) {
      console.log("Error is :", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDelete = async (e) =>{
    e.preventDefault()
    try {
      setDeleteLoad(true)
      const { data } = await Axios.delete(`workout/delete/${id}`);
      if (data.status === 200) {
        SuccessToaster(data?.message[0])
        setShowModal(false)
        navigate("/workout-plans")
        setDeleteLoad(false)
      } else {
        ErrorToaster(data?.message[0]);
        setDeleteLoad(false)
      }
    } catch (error) {
      setDeleteLoad(false)
      ErrorToaster(error.message);
      console.log("Error-> : ", error);
    } finally {
      setDeleteLoad(false)
    }
  }

  //* API CALL FOR GET WORKOUT DETAILS
  const [workoutDetail, setWorkoutDetail] = useState([]);

  const getWorkoutDetail = async (workoutId) => {
    try {
      setLoading(true);
      const { data } = await Axios.get(
        `workout/getOne/${workoutId}?isSession=false`
      );

      if (data.status === 200) {
        setWorkoutDetail(data?.data);
        const {_id,title,description,category,subCategory,bodyPart,totalTime,calorieburn,totalExercises,exercise,breakTime,thumbnail} = data?.data;
        setSelectedCategory(category);
        setSelectedSubCategory(() =>
          subCategory === "BodyWeight"? "Bodyweight Cardio"
            : subCategory === "Equipment"? "Equipment-Based Cardio"
            : subCategory === "FreeWeight"? "Free Weight"
            : subCategory
        );
        setSubCategory(subCategory);
        bodyPart
          ? setSelectedBodyPart(bodyPart)
          : setSelectedBodyPart("Triceps");
        setWorkoutTitle(title);
        setWorkoutDescription(description);
        setDuration(totalTime);
        setCalorieBurn(calorieburn);
        setTotalExercises(totalExercises);
        setRestBetween(breakTime);
        setImgAddress(thumbnail);

        const mappedExercises = exercise.map((ex) => ({
          id: ex._id,
          title: ex.name,
          sets: ex.totalSets || "",
          reps: ex.reps || "",
          time: ex.time || "",
          calorieburn: ex.calorieburn,
          restBetweenSets: ex.restBetweenSets || "",
          image: ex.url || null,
          isTimeBased: !!ex.time,
        }));
        setExerciseList(mappedExercises);
      } else {
        ErrorToaster(data?.message[0]);
      }
    } catch (error) {
      ErrorToaster(error.message);
      console.log("Error-> : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkoutDetail(id);
  }, [id]);

  return (
    <div className="w-full bg-white rounded-xl p-6">
      <ConfirmationDialog showModal={showModal} onclick={handleModal} action={handleDelete} loading={deleteLoad} title="Are you sure?" text="You Won't be able to revert this"/>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-start gap-4"
        >
          <div className="w-full">
            {editable ? (
              <Fragment>
                {imgLoading ? (
                  <Uploader />
                ) : (
                  <div
                    onClick={handleProfileImg}
                    className="w-full h-60 md:h-80 bg-white border border-[#eaeaea] cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
                  >
                    <input
                      ref={fileInputRef}
                      disabled={!editable}
                      id="cat-image-add"
                      className="w-full hidden h-10 rounded-full text-sm  outline-none border-none px-4"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleProfileChange(e)}
                    />
                    <img
                      src={imgAddress}
                      className="w-full h-full rounded-xl object-contain"
                    />
                  </div>
                )}
              </Fragment>
            ) : (
              <img
                src={workoutDetail.thumbnail}
                alt="workout-image"
                className="w-full h-60 md:h-80 rounded-xl object-contain"
              />
            )}
          </div>

          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Workout Title</label>
            <input
              type="text"
              disabled={!editable}
              placeholder="Title"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              value={workoutTitle}
              onChange={(e) => setWorkoutTitle(e.target.value)}
            />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
              <label className="text-sm font-medium">Workout Category</label>
              <select
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={selectedCategory}
                onChange={handleCategoryChange}
                disabled={!editable}
              >
                <option value="">Select Category</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
              <label className="text-sm font-medium">Sub-Category</label>
              <select
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={selectedSubCategory}
                onChange={(e) => handleSubCategory(e)}
                disabled={!editable}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedSubCategory === "Free Weight" ||
          selectedSubCategory === "Gym" ? (
            <div className="w-full">
              <div className="w-full flex flex-col items-start gap-1">
                <label className="text-sm font-medium">Sub-category</label>
                <select
                  className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                  value={selectedBodyPart}
                  onChange={(e) => setSelectedBodyPart(e.target.value)}
                  disabled={!editable}
                >
                  <option value="">Select Body Part</option>
                  <option value="Biceps">Biceps</option>
                  <option value="Triceps">Triceps</option>
                  <option value="Chest">Chest</option>
                  <option value="Back">Back</option>
                  <option value="Shoulder">Shoulders</option>
                  <option value="Legs">Legs</option>
                </select>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Workout Description</label>
            <textarea
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              value={workoutDescription}
              rows={"5"}
              disabled={!editable}
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
              onChange={(e) => setWorkoutDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
              <label className="text-sm font-medium">
                Estimated Calorie Burn
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={calorieBurn}
                disabled={!editable}
                placeholder="500"
                onChange={(e) => setCalorieBurn(e.target.value)}
              />
            </div> */}
            
            <div className="col-span-2 md:col-span-1 flex flex-col items-start gap-1">
              <label className="text-sm font-medium">
                Duration{" "}
                <span className="text-xs text-gray-400">(minutes)</span>
              </label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={duration}
                disabled={!editable}
                placeholder="10 min"
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Total Exercises</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              value={totalExercises}
              disabled
              placeholder="6"
              onChange={(e) => handleTotalExercisesChange(e)}
            />
          </div>

          {exerciseList.map((exercise, index) => (
            <div key={index} className="w-full flex flex-col items-start gap-4">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Exercise Title */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <label className="text-sm font-medium flex items-center justify-start gap-4">
                    <span>Exercise {index + 1} Title</span>
                    {index >= 1 && (
                      <button
                        type="button"
                        className="text-red-600 font-medium text-xs"
                        onClick={() => removeExerciseField(exercise.id)}
                      >
                        Delete Exercise
                      </button>
                    )}
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    value={exercise.title}
                    disabled={!editable}
                    placeholder="Exercise Title"
                    onChange={(e) =>
                      handleExerciseChange(index, "title", e.target.value)
                    }
                  />
                </div>

                {/* Sets */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <label className="text-sm font-medium">Sets</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    value={exercise.sets}
                    disabled
                    placeholder="3"
                    onChange={(e) =>
                      handleExerciseChange(index, "sets", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reps or Time */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <label className="text-sm font-medium">
                    {exercise.isTimeBased ? "Time Duration" : "No. Reps"}
                  </label>
                  {exercise.isTimeBased ? (
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                      placeholder="Enter time in seconds"
                      value={exercise.time}
                      disabled={!editable}
                      onChange={(e) =>
                        handleExerciseChange(index, "time", e.target.value)
                      }
                      min={1}
                    />
                  ) : (
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                      placeholder="Enter no. of reps"
                      value={exercise.reps}
                      disabled={!editable}
                      onChange={(e) =>
                        handleExerciseChange(index, "reps", e.target.value)
                      }
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
                        handleTimeBasedChange(index, e.target.checked);
                      }}
                    />
                    <label htmlFor="timeBased" className="text-xs">
                      Is the exercise time based?
                    </label>
                  </div>
                </div>

                {/* Calories */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <label className="text-sm font-medium">Calories Burn</label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    value={exercise.calorieburn}
                    disabled={!editable}
                    placeholder="3"
                    onChange={(e) =>
                      handleExerciseChange(index, "calorieburn", e.target.value)
                    }
                  />
                </div>
                {/* Exercise Image */}
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
              <div className="w-full flex flex-col gap-1 items-start">
                  <label className="text-sm font-medium">Exercise Image</label>
                  <div className="w-full flex justify-between ">
                    <input
                      type="file"
                      disabled={!editable}
                      accept="image/*"
                      className="w-full h-12 border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    {exercise.image && (
                      <Fragment>
                        {snippetLoading[index]?.load ? (
                          <div>uploading...</div>
                        ) : (
                          <>
                            {snippetErr[index]?.error ? (
                              <p className="text-red-700 text-[12px] pl-1">
                                Upload failed: Make sure correct file type
                              </p>
                            ) : (
                              <img
                                src={exercise.image}
                                alt="Preview"
                                className=" ml-2 w-14 h-14 object-cover"
                              />
                            )}
                          </>
                        )}
                      </Fragment>
                    )}
                  </div>
                  {imageErrors[index] && (
                    <p className="text-red-600 text-xs mt-1">
                      {imageErrors[index]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="block">
            <button
              disabled={!editable}
              type="button"
              className={`${styles.bgColor} text-white font-medium text-[10px] px-3 py-2 rounded-lg`}
              onClick={addExerciseField}
            >
              Add More Exercises
            </button>
          </div>
          {editable ? (
            <div className="w-full flex justify-end bg-white rounded-b-xl items-center gap-4 py-2">
              <button
                disabled={btnLoading}
                type="submit"
                className={`${styles.bgColor} text-white text-sm font-medium px-3 py-2 rounded-lg`}
              >
                {btnLoading ? "Updating... " : "Update Workout"}
              </button>
              <button
                onClick={(e) => {e.preventDefault();setEditable(false)}}
                className={`bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg`}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-end py-2">
              <button
              disabled={deleteLoad}
                onClick={(e)=>handleModal(e)}
                className={`bg-red-600 text-white px-4 py-2 mx-1 rounded-lg text-sm font-medium mt-2 float-end`}
              >
                Delete
              </button>
              <button
                className={`${styles.bgColor} text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 float-end`}
                onClick={(e) => {
                  e.preventDefault();
                  setEditable(true);
                }}
              >
                Edit Workout
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default EditWorkoutForm;
