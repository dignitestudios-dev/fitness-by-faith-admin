import React, { useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { FiTrash } from "react-icons/fi";
import Axios from "../../axios";
import Loader from "../Global/Loader";
import { ErrorToaster, SuccessToaster } from "../Global/Toaster";
import { ImagePlaceHolder } from "../../assets/export";
import Uploader from "../Global/Uploader";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Global/ConfirmationDialog";

const VideoDetailsAndEdit = ({id, editable, setEditable}) => {
  const navigate = useNavigate()
  const [videoTitle, setVideoTitle] = useState("");
  // const [exerciseName, setExerciseName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [instructions, setInstructions] = useState([
    { title: "", description: "" },
  ]);

  const [imgAddress, setImgAddress] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("");

  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false);
  const [videoErr, setVideoErr] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const [deleteLoad, setDeleteLoad] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const handleModal = (e) => {
    e.preventDefault()
    setShowModal(!showModal);
  };

  const handleDelete = async (e) =>{
    e.preventDefault()
    try {
      setDeleteLoad(true)
      const { data } = await Axios.delete(`video/delete/${id}`);
      if (data.status === 200) {
        SuccessToaster(data?.message[0])
        setShowModal(false)
        navigate("/videos")
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

  const handleThumbnailChange = async (e) => { 
    setThumbnail(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    if (file) {
      try {
        const {data} = await Axios.post("media/upload/image", formData,);
        if(data?.status === 200){
          setImgAddress(data?.data?.fileAddress);
        }
      } catch (error) {
        console.error("Error->", error.message);
      }
    }
  };

  const handleVideoChange = async(e) => {
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
        setVideoFile(data?.data?.fileAddress);
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
  };
}

  const handleInstructionChange = (index, field, value) => {
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
    if (!selectedCategory|| !videoTitle || !subCategory|| !selectedBodyPart||
       !videoDescription|| !imgAddress|| !instructions|| !videoFile) {
      ErrorToaster("All fields are required");
      return;
    }

    const videoData = {
      title: videoTitle,
      category: selectedCategory,
      subCategory: subCategory,
      bodyPart: selectedBodyPart || "Chest",
      description: videoDescription,
      thumbnail: imgAddress,
      "instructions" : instructions,
      "url" : videoFile,
    };

    try {
      setBtnLoading(true);
      const { data } = await Axios.put(`video/update/${id}`, videoData);
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

  const [videoDetail, setVideoDetail] = useState([]);

  const getVideoDetail = async (videoId) => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`video/getOne/${videoId}`);

      if (data.status === 200) {
        setVideoDetail(data?.data);
        const {_id,title, description, category, subCategory, bodyPart, thumbnail, url, instructions} = data?.data;
        setVideoFile(url)
        setImgAddress(thumbnail)
        setSelectedCategory(category);
        setSelectedSubCategory(() =>
          subCategory === "BodyWeight"? "Bodyweight Cardio"
            : subCategory === "Equipment"? "Equipment-Based Cardio"
            : subCategory === "Free Weight"? "FreeWeight" : subCategory
        );
        setSubCategory(subCategory);
        bodyPart ? setSelectedBodyPart(bodyPart) : setSelectedBodyPart("Triceps");
        setVideoTitle(title);
        setVideoDescription(description)
        setSelectedBodyPart(bodyPart)
        setInstructions(instructions) 
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
    getVideoDetail(id);
  }, [id]);

  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <ConfirmationDialog showModal={showModal} onclick={handleModal} action={handleDelete} loading={deleteLoad} title="Are you sure?" text="You Won't be able to revert this"/>
      {loading?
      <Loader/>:
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-start gap-4"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Video Thumbnail</label>
            <input
            disabled={!editable}
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            />
            <div className="flex justify-center items-center w-full">
            {imgAddress ? (
              <img
                className="mt-2 w-[220px]"
                src={imgAddress}
                alt="Thumbnail Preview"
              />
            ):(<img src={ImagePlaceHolder} alt="" className="block w-[200px] object-cover"/>)}
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Workout video</label>
            <input
            disabled={!editable}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            />
            {videoLoading ? (
              <Uploader/>
            ) : (
              <>
                {videoFile && (
                  <video className="mt-2" width="320" height="240" controls>
                  <source src={videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                )}
                {videoErr && (
                  <p className="text-red-700 text-[12px] pl-1">
                    Upload failed: Make sure correct file type
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
          <div className="w-full flex flex-col items-start gap-1">
            <label className="text-sm font-medium">Video Title</label>
            <input
            disabled={!editable}
              type="text"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
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
            disabled={!editable}
              name="subCategory"
              id="subCategory"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col items-start gap-1">
            <label htmlFor="subCategory" className="text-sm font-medium">
              Video Sub-Category:
            </label>
            <select
            disabled={!editable}
              name="subCategory"
              id="subCategory"
              value={selectedSubCategory}
              onChange={(e) => handleSubCategory(e)}
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
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
          <label className="text-sm font-medium">Video Description</label>
          <textarea
          disabled={!editable}
            className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            value={videoDescription}
            rows={"5"}
            onChange={(e) => setVideoDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="w-full flex flex-col items-start gap-1">
          <label className="text-sm font-medium">Video Instructions</label>

          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between gap-6 lg:gap-3"
            >
              <input
              disabled={!editable}
                type="text"
                placeholder="Instruction Title"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                value={instruction.title}
                onChange={(e) =>
                  handleInstructionChange(index, "title", e.target.value)
                }
              />
              <input
              disabled={!editable}
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
          ))}
        </div>
        {editable && 
        <button
          type="button"
          className={`${styles.bgColor} text-white font-medium mt-1 py-2 px-3 rounded-lg text-[10px]`}
          onClick={addInstructionField}
        >
          Add Instruction
        </button>
        }
        <div className="w-full py-4">
        {editable ? (
            <div className="w-full flex justify-end bg-white rounded-b-xl items-center gap-4 py-2">
              <button
                disabled={btnLoading}
                type="submit"
                className={`${styles.bgColor} text-white text-sm font-medium px-3 py-2 rounded-lg`}
              >
                {btnLoading ? "Updating... " : "Update Video"}
              </button>
              <button
                onClick={(e) => {e.preventDefault();setEditable(false)}}
                className={`bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg`}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="w-full py-2">
              <button
                className={`${styles.bgColor} text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 float-end`}
                onClick={(e) => {
                  e.preventDefault();
                  setEditable(true);
                }}
              >
                Edit Video
              </button>
              <button
                    disabled={deleteLoad}
                    onClick={(e) => handleModal(e)}
                    className={`bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 mr-2 float-end`}
                  >
                    Delete
                  </button>
            </div>
          )}
          
        </div>
      </form>
      }
    </div>
    )
};

export default VideoDetailsAndEdit;
