import React, { Fragment, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { styles } from "../../styles/styles";
import { FiTrash } from "react-icons/fi";
import Axios from "../../axios";
import { ErrorToaster, SuccessToaster } from "../Global/Toaster";
import Loader from "../Global/Loader";
import { useNavigate } from "react-router-dom";
import Uploader from "../Global/Uploader";

const VideoWorkoutForm = () => {
  const navigate = useNavigate()
  const [videoTitle, setVideoTitle] = useState("");
  // const [exerciseName, setExerciseName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imgAddress, setImgAddress] = useState('');
  const [videoAddress, setVideoAddress] = useState('');
  const [videoLoading, setVideoLoading] = useState(false)
  const [instructions, setInstructions] = useState([
    { title: "", description: "" },
  ]);

  const [snippetErr, setSnippetErr] = useState(false)
  const [videoErr, setVideoErr] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("Chest");
  const [instructionErrors ,setInstructionErrors] = useState("")

  const [videoError, setVideoError] = useState({
    imgErr: '',
    videoTitleErr: '',
    videoDescriptionErr: '',
    videoFileErr: '',
    videoAddressErr: '',
    instructionErr: '',
    selectedCategoryErr: '',
    selectedSubCategoryErr: '',
    selectedBodyPartErr: ''
  });  

  const handleCategoryChange = (event) => {
    setVideoError({selectedCategoryErr: ''})
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
    setSubCategory("")
  };

  const categories = {
    Yoga: [],
    Cardio: ["Bodyweight Cardio", "Equipment-Based Cardio"],
    Lifting: ["Free Weight", "Gym"],
  };

  const subCategories = categories[selectedCategory] || [];

  const handleSubCategory = (e) => {
    setVideoError({selectedSubCategoryErr: ''})
    setSelectedSubCategory(e.target.value);
    if (e.target.value === "Bodyweight Cardio")
      return setSubCategory("BodyWeight");
    if (e.target.value === "Equipment-Based Cardio")
      return setSubCategory("Equipment");
    if (e.target.value === "Free Weight") return setSubCategory("FreeWeight");
    if (e.target.value === "Gym") return setSubCategory("Gym");
  };

  const handleThumbnailChange =async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setVideoError({imgErr: ''})
    if (file) {
      try {
        setSnippetErr(false)
        setImgLoading(true);
        const {data} = await Axios.post("media/upload/image", formData,);
        if(data?.status === 200){
          setImgAddress(data?.data?.fileAddress);
          setImgLoading(false);
        }else{
          setSnippetErr(true)
          setImgLoading(false);
        }
      } catch (error) {
        console.error("Error->", error.message);
        setSnippetErr(true)
        setImgLoading(false);
      }
    }
  };

  const handleVideoChange = async (e) => {
    console.log("function call")
    setVideoError({videoAddressErr: ''})
    setVideoFile(e.target.files[0]);
    const file = e.target.files[0];
  if (file) {
    setVideoFile(file);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      setVideoLoading(true);
      setVideoErr(false)
      const { data } = await Axios.post("media/upload/video", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data?.status === 200) {
        setVideoAddress(data?.data?.fileAddress);
        setVideoErr(false)
      } else {
        setVideoErr(true)
        console.error("Upload failed:", data?.message);
      }
    } catch (error) {
      setVideoErr(true)
      console.error("Error->", error.response ? error.response.data : error.message);
    } finally {
      setVideoLoading(false);
    }
  }
  };

  const handleInstructionChange = (index, field, value) => {
    setInstructionErrors("")
    const updatedInstructions = [...instructions];
    updatedInstructions[index][field] = value;
    setInstructions(updatedInstructions);
  };

  const addInstructionField = () => {
    setInstructions([...instructions, { title: "", description: "" }]);
  };

  const removeInstructionField = (index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = [
      { field: "imgErr", value: imgAddress, message: "Upload Image" },
      { field: "videoTitleErr", value: videoTitle, message: "Title required" },
      { field: "videoDescriptionErr", value: videoDescription, message: "Description required" },
      { field: "videoFileErr", value: videoFile, message: "Video file required" },
      { field: "videoAddressErr", value: videoAddress, message: "Video required" },
      { field: "selectedCategoryErr", value: selectedCategory, message: "Category required" },
      { field: "selectedSubCategoryErr", value: selectedCategory === "Yoga"? "Gym" : subCategory , message: "Sub-category required" },
      { field: "selectedBodyPartErr", value: selectedBodyPart, message: "Body part selection required" },
    ];

    const mapError = {};

    const errors = { ...videoError };
    let hasError = false;
    
    fieldsToValidate.forEach(({ field, value, message }) => {
      if (!value) {
        errors[field] = message;
        hasError = true;
      }
    });
    
    if (hasError) {
      setVideoError(errors);
      return;
    }
    
    instructions.forEach((instruction, index) => {
      
      if(!instruction.description){
        mapError[index] = "Content required";
      }
      if (!instruction.title) {
        mapError[index] = "Title required";
      }
    });

    if (Object.keys(mapError).length > 0) {
      setInstructionErrors(mapError);
      return; 
    }

    const videoData = {
      title: videoTitle,
      category: selectedCategory,
      subCategory: selectedCategory==="Yoga" ? "Gym" :subCategory,
      bodyPart: selectedBodyPart || "Chest",
      description: videoDescription,
      thumbnail: imgAddress,
      "instructions" : instructions,
      "url" : videoAddress,
    };

    try {
      setBtnLoading(true);
      const { data } = await Axios.post(`video/create`, videoData);
      if (data.status === 200) {
        SuccessToaster(data?.message[0]);
        setBtnLoading(false);
        navigate("/videos");
      } else {
        setBtnLoading(false);
        ErrorToaster(data?.message[0]);
      }
    } catch (error) {
      ErrorToaster(error?.message);
      console.log("Error is :", error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-start gap-4"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Video Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.imgErr ? "ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
            />
            {imgLoading ? (
              <Uploader/>
            ) : (
              <Fragment>
                {imgAddress && (
                  <img
                    className="mt-2 h-auto w-[180px] mx-auto"
                    src={imgAddress}
                    alt="Thumbnail Preview"
                  />
                )}
                {snippetErr && (
                  <p className="text-red-700 text-[12px] pl-1">
                    Upload failed: Make sure correct file type
                  </p>
                )}
              </Fragment>
            )}
            {videoError?.imgErr && (<p className="text-red-600 text-xs">{videoError.imgErr}</p>)}
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Workout video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.videoAddressErr ? "ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
            />
            {videoLoading ? (
              <Uploader/>
            ) : (
              <>
                {videoFile && (
                  <video className="mt-2" width="320" height="240" controls>
                    <source
                      src={URL.createObjectURL(videoFile)}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
                {videoErr && ( <p className="text-red-700 text-[12px] pl-1"> Upload failed: Make sure correct file type </p> )}
                {videoError?.videoAddressErr && (<p className="text-red-600 text-xs">{videoError?.videoAddressErr}</p>)}
              </>
            )}
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Video Title</label>
            <input
              type="text"
              className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.videoTitleErr ? "ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
              value={videoTitle}
              onChange={(e) => {setVideoTitle(e.target.value);setVideoError({videoTitleErr: ''})}}
            />
            {videoError?.videoTitleErr && (<p className="text-red-600 text-xs">{videoError?.videoTitleErr}</p>)}
          </div>
          {/* <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Exercise Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
            />
          </div> */}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Video Category</label>
            <select
              name="subCategory"
              id="subCategory"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.selectedCategoryErr ? "ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {videoError?.selectedCategoryErr && (<p className="text-red-600 text-xs">{videoError?.selectedCategoryErr}</p>)}
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label htmlFor="subCategory" className="text-sm font-medium">
              Video Sub-Category:
            </label>
            <select
              name="subCategory"
              id="subCategory"
              value={selectedSubCategory}
              onChange={(e) => handleSubCategory(e)}
              className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.selectedSubCategoryErr ? "ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
            {videoError?.selectedSubCategoryErr && (<p className="text-red-600 text-xs">{videoError?.selectedSubCategoryErr}</p>)}
          </div>
        </div>

        {selectedSubCategory === "Free Weight" ||
        selectedSubCategory === "Gym" ? (
          <div className="w-full">
            <div className="w-full flex flex-col items-start gap-1">
              <label className="text-sm font-medium">Sub-category</label>
              <select
                className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.selectedBodyPartErr ? "ring-red-600 border-red-600 outline-red-600":
                  "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
                value={selectedBodyPart}
                onChange={(e) => {setSelectedBodyPart(e.target.value);setVideoError({selectedBodyPartErr:""})}}
              >
                <option value="">Select Body Part</option>
                <option value="Biceps">Biceps</option>
                <option value="Triceps">Triceps</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Shoulder">Shoulders</option>
                <option value="Legs">Legs</option>
              </select>
              {videoError?.selectedBodyPartErr && (<p className="text-red-600 text-xs">{videoError?.selectedBodyPartErr}</p>)}
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="w-full flex flex-col items-start gap-1">
          <label className="text-sm font-medium">Video Description</label>
          <textarea
          className={`w-full border rounded-lg px-3 py-3 text-sm ${videoError?.videoDescriptionErr ? "ring-red-600 border-red-600 outline-red-600":
            "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
            value={videoDescription}
            rows={"5"}
            onChange={(e) => {setVideoDescription(e.target.value);setVideoError({videoDescriptionErr:""})}}
          ></textarea>
          {videoError?.videoDescriptionErr && (<p className="text-red-600 text-xs">{videoError?.videoDescriptionErr}</p>)}
        </div>

        <div className="w-full flex flex-col items-start gap-1">
          <label className="text-sm font-medium">Video Instructions</label>

          {instructions.map((instruction, index) => (
            <>
            <div
              key={index}
              className="w-full flex items-center justify-between gap-6 lg:gap-3"
            >
              <input
                type="text"
                placeholder="Instruction Title"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={instruction.title}
                onChange={(e) =>
                  handleInstructionChange(index, "title", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Instruction Content"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={instruction.description}
                onChange={(e) =>
                  handleInstructionChange(index, "description", e.target.value)
                }
              />
              {index === 0 ? (
                <button
                  type="button"
                  disabled
                  className="bg-red-100 text-white font-medium py-2.5 px-4 text-sm rounded-lg cursor-not-allowed"
                  onClick={() => removeInstructionField(index)}
                >
                  <FiTrash className="text-lg text-red-600" />
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-100 text-white font-medium py-2.5 px-4 text-sm rounded-lg"
                  onClick={() => removeInstructionField(index)}
                >
                  <FiTrash className="text-lg text-red-600" />
                </button>
              )}
            </div>
          {instructionErrors[index] && (<p className="text-red-600 text-xs ">{instructionErrors[index]}</p>)}
          </>
          ))}
        </div>
        <button
          type="button"
          className={`${styles.bgColor} text-white font-medium mt-1 py-2 px-3 rounded-lg text-[10px]`}
          onClick={addInstructionField}
        >
          Add Instruction
        </button>
        <div className="w-full py-4">
          <button
            disabled={btnLoading}
            type="submit"
            className={`${styles.bgColor} float-end text-white font-medium py-2.5 px-4 rounded-lg text-sm`}
          >
            {btnLoading ? "Creating" : "Create Workout"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoWorkoutForm;
