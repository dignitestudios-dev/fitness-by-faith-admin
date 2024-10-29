import React, { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import TextField from "../Global/TextField";

const CreateWorkoutForm = () => {
  // Image:
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const [instructions, setInstructions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleProfileImg = () => {
    fileInputRef.current.click();
  };
  const handleProfileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const base64String = await convertImageToBase64(file);
        setImage(base64String);
        // updateProfile(base64String);

        // console.log(base64String)abc
      } catch (error) {
        console.error("Error converting image to base64:", error.message);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add new instruction to the list
    if (inputValue.trim() !== "") {
      setInstructions([...instructions, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Create Workout Plan</h1>
      {/* form */}
      <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-4">
        <div className="w-full">
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
            {image ? (
              <img
                src={`data:image/webp;base64,${image && image}`}
                className="w-full h-full rounded-xl object-contain"
              />
            ) : (
              <div className="w-auto flex flex-col gap-3 justify-center items-center">
                <LuImagePlus className="text-4xl font-medium text-gray-400" />
                <span className="text-sm font-normal text-gray-400">
                  Please provide the Image in jpg or png format.
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <TextField
              inputType={"text"}
              label={"Workout Title"}
              placeholder={"Title"}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="meal-category" className="text-sm font-medium">
              Workout Category
            </label>
            <select
              name="meal-category"
              id="meal-category"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            >
              <option selected value="">
                Choose a category
              </option>
              <option value="Vegans">Yoga</option>
              <option value="Low carbs">Cardio</option>
              <option value="High carbs">Listing</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="description" className="text-sm font-medium">
            Workout Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={"5"}
            placeholder="Write some description..."
            className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
          ></textarea>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType={"text"}
                label={"Workout Duration"}
                placeholder={"10 mins"}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType={"text"}
                label={"Sstimated cClorie Burn"}
                placeholder={"500"}
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default CreateWorkoutForm;
