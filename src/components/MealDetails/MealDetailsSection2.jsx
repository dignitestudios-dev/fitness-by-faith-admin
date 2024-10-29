import React, { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import TextField from "../Global/TextField";
import { styles } from "../../styles/styles";
import { MealImage } from "../../assets/export";

const MealDetailsSection2 = () => {
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

        // console.log(base64String)
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
    <div className="w-full min-h-screen flex flex-col gap-6 items-start">
      <form
        onSubmit={handleFormSubmit}
        className="w-full bg-white p-6 rounded-xl flex flex-col gap-6 items-start"
      >
        {/* <div className="w-full">
          <div
            onClick={handleProfileImg}
            className="w-full h-60 md:h-96 bg-white border border-[#eaeaea] cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center"
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
        </div> */}
        <img
          src={`https://images.unsplash.com/photo-1626524818721-872c6e7f3c8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          className="w-full h-[50vh] rounded-2xl object-contain"
        />
        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="meal-title" className="text-sm font-medium">
                Meal Title
              </label>
              <input
                type="text"
                disabled
                placeholder="Grilled Chicken Salad"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="meal-category" className="text-sm font-medium">
                Meal Category
              </label>
              <input
                type="text"
                disabled
                placeholder="Vegan"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
              {/* <select
                name="meal-category"
                id="meal-category"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              >
                <option selected value="">
                  Choose a category
                </option>
                <option value="Vegans">Vegans</option>
                <option value="Low carbs">Low carbs</option>
                <option value="High carbs">High carbs</option>
                <option value="High protien">High protien</option>
              </select> */}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={"5"}
              disabled
              placeholder="Write some description..."
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            ></textarea>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="meal-title" className="text-sm font-medium">
                Prep. Time
              </label>
              <input
                type="text"
                disabled
                placeholder="10 min"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="meal-title" className="text-sm font-medium">
                Serving Size
              </label>
              <input
                type="text"
                disabled
                placeholder="1 Plate"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="meal-title" className="text-sm font-medium">
                No. of Serving
              </label>
              <input
                type="text"
                disabled
                placeholder="2"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="Carbs" className="text-sm font-medium">
                Carbs
              </label>
              <input
                type="text"
                disabled
                placeholder="31.1g"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="fat" className="text-sm font-medium">
                Fat
              </label>
              <input
                type="text"
                disabled
                placeholder="31.1g"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="protien" className="text-sm font-medium">
                Protien
              </label>
              <input
                type="text"
                disabled
                placeholder="31.1g"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="calories" className="text-sm font-medium">
                Calories
              </label>
              <input
                type="text"
                disabled
                placeholder="31.1g"
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
            {/* <div className="col-span-2 md:col-span-1">
              <label htmlFor="Ingredient" className="text-sm font-medium">
                Enter Ingredient:{" "}
                <span className="text-xs text-gray-400 ml-1">
                  (Press Enter to Add More)
                </span>
              </label>
              <input
                type="text"
                id="Ingredient"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter an ingredient..."
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div> */}
          </div>
          {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="instructionInput" className="text-sm font-medium">
                Enter Instructions:{" "}
                <span className="text-xs text-gray-400 ml-1">
                  (Press Enter to Add More)
                </span>
              </label>
              <input
                type="text"
                id="instructionInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter an instruction..."
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              />
            </div>
            <div className="col-span-2 md:col-span-1"></div>
          </div> */}
          <div className="w-full flex items-center justify-end gap-4">
            <button
              className={`text-sm font-medium text-white ${styles.bgColor} rounded-lg px-4 py-2`}
            >
              Update
            </button>
            <button
              className={`text-sm font-medium text-white bg-red-600 rounded-lg px-4 py-2`}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MealDetailsSection2;
