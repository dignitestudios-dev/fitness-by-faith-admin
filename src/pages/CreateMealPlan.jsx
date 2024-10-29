import React, { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import TextField from "../components/Global/TextField";
import { styles } from "../styles/styles";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import Axios from "../axios";
import Loader from "../components/Global/Loader";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToaster, SuccessToaster } from "../components/Global/Toaster";
import Uploader from "../components/Global/Uploader";

const CreateMealPlan = () => {

  const navigate = useNavigate()

  const [mealDetails, setMealDetails] = useState({
    title: '',
    description: '',
    prepTime: '',
    servingSize: '',
    numServing: '',
    carbs: '',
    fat: '',
    protein: '',
    calories: '',
  });

  const [mealError, setMealError] = useState({
    imgErr: '',
    titleErr: '',
    categoryErr:'',
    prepTimeErr: '',
    servingSizeErr: '',
    numServingErr: '',
    carbsErr: '',
    fatErr: '',
    proteinErr: '',
    caloriesErr: '',
    ingredient:'',
    instruction:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMealError({})
    setMealDetails({
      ...mealDetails,
      [name]: value,
    });
  };

  const [category, setCategory] = useState("");

  const handleCategoryChange = (e) => {
    setMealError({})
    setCategory(e.target.value);
  };
  
  const [instructions, setInstructions] = useState([""]);

  // Image:
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imgAddress, setImgAddress] = useState('');
  
  const [imgLoading, setImgLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)

  const handleProfileImg = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setMealError({})
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

  const handleFormSubmit = async(e) => {
    e.preventDefault();

    const fieldsToValidate = [
      { field: "imgErr", value: imgAddress, message: "Upload Image" },
      { field: "titleErr", value: mealDetails.title, message: "Title required"},
      { field: "ingredient", value: ingredients[0], message: "Ingredients required" },
      {field: "instruction", value: instructions[0], message: "Instruction required" },
      { field: "categoryErr", value: category, message: "Category required" },
      { field: "prepTimeErr", value: mealDetails.prepTime, message: "Preparation time required" },
      { field: "servingSizeErr", value: mealDetails.servingSize, message: "Serving size required" },
      { field: "carbsErr", value: mealDetails.carbs, message: "Carbohydrates value required" },
      { field: "fatErr", value: mealDetails.fat, message: "Fat value required" },
      { field: "proteinErr", value: mealDetails.protein, message: "Protein value required" },
      { field: "caloriesErr", value: mealDetails.calories, message: "Calories value required", },
      { field: "numServingErr", value: mealDetails.numServing, message: "Number of servings required" },
    ];

    const errors = { ...mealError };
    let hasError = false;

    fieldsToValidate.forEach(({ field, value, message }) => {
      if (!value) {
        errors[field] = message;
        hasError = true;
      }
    });

    if (hasError) {
      setMealError(errors);
      return;
    }

    const apiData={ 
      "url" : imgAddress,
      "title" : mealDetails.title,
      "serving" : "1",
      "carbs" : mealDetails.carbs,
      "protein" : mealDetails.protein,
      "fat" : mealDetails.fat,
      "calories" : mealDetails.calories,
      "prepTime" : mealDetails.prepTime,
      "servingSize" : mealDetails.servingSize,
      "numServing" : mealDetails.numServing,
      "ingredients": ingredients,
      "instructions" : instructions,
      "category": category
    }

    try {
      setBtnLoading(true)
      const {data} = await Axios.post('meal/create', apiData);
      if (data.status === 200) {
        SuccessToaster(data.message[0])
        setBtnLoading(false)
        navigate("/meal-plans")
      }
      else{
        setBtnLoading(false)
        ErrorToaster(data.message[0])
      }
    } catch (error) {
      console.error('Error creating meal:', error);
      ErrorToaster("There was an error submitting data. Please try again.")
    }
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
    setMealError({})
  };

  const addInstructionField = () => {
    setInstructions([...instructions,""]);
  };

  const removeInstructionField = (index) => {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
};

  //
  const [ingredients, setIngredients] = useState([""]);

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
    setMealError({})
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    const updatedInstructions = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedInstructions);
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 items-start">
      <h1 className="text-xl font-semibold">Create a Meal Plan</h1>
      <form
        onSubmit={handleFormSubmit}
        className="w-full bg-white p-6 rounded-xl flex flex-col gap-6 items-start"
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
              className={`w-full h-60 md:h-80 ${mealError.imgErr? "border border-red-600" : 
                "bg-white border border-[#eaeaea]"} cursor-pointer rounded-xl flex flex-col gap-1 justify-center items-center`}
            >
              <input
                ref={fileInputRef}
                id="cat-image-add"
                className={`w-full hidden h-10 rounded-full text-sm "outline-none border-none" px-4`}
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
                    Please upload meal thumbnail.
                  </span>
                </div>
              )}
            </div>
          )}
          {mealError.imgErr&& (<p className="text-red-600 text-xs ">{mealError.imgErr}</p>)}
        </div>

        <div className="w-full flex flex-col gap-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType={"text"}
                label={"Meal Title"}
                placeholder={"Title"}
                value={mealDetails.title}
                onChange={handleInputChange}
                name="title"
                error={mealError.titleErr}
              />
              {mealError.titleErr && (<p className="text-red-600 text-xs ">{mealError.titleErr}</p>)}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="meal-category" className="text-sm font-medium">
                Meal Category
              </label>
              <select
                name="meal-category"
                id="meal-category"
                className={`w-full border rounded-lg px-3 py-3 text-sm ${mealError?.categoryErr ? "ring-red-600 border-red-600 outline-red-600":
                "focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"}`}
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>
                  Choose a category
                </option>
                <option value="Vegan">Vegan</option>
                <option value="LowCarbs">Low carbs</option>
                <option value="HighCarbs">High carbs</option>
                <option value="HighProtein">High Protein</option>
              </select>
            {mealError?.categoryErr && (<p className="text-red-600 text-xs ">{mealError.categoryErr}</p>)}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
            value={mealDetails.description}
            onChange={handleInputChange}
              name="description"
              id="description"
              rows={"5"}
              placeholder="Write some description..."
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
            ></textarea>
            {mealError.descriptionErr && (<p className="text-red-600 text-xs ">{mealError.descriptionErr}</p>)}
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="Prep. Time"
                name="prepTime"
                value={mealDetails.prepTime}
                onChange={handleInputChange}
                placeholder="10 mins"
                error={mealError?.prepTimeErr}
              />
              {mealError?.prepTimeErr && (<p className="text-red-600 text-xs ">{mealError.prepTimeErr}</p>)}
            </div>
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="Serving Size"
                name="servingSize"
                value={mealDetails.servingSize}
                onChange={handleInputChange}
                placeholder="1 Plate"
                error={mealError?.servingSizeErr}
              />
              {mealError?.servingSizeErr && (<p className="text-red-600 text-xs ">{mealError.servingSizeErr}</p>)}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="No. of Serving"
                name="numServing"
                value={mealDetails.numServing}
                onChange={handleInputChange}
                placeholder="2,3,4..."
                error={mealError?.numServingErr}
              />
              {mealError?.numServingErr && (<p className="text-red-600 text-xs ">{mealError.numServingErr}</p>)}
            </div>
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="Enter Carbs"
                name="carbs"
                value={mealDetails.carbs}
                onChange={handleInputChange}
                placeholder="31.1 g"
                error={mealError?.carbsErr}
              />
              {mealError?.carbsErr && (<p className="text-red-600 text-xs ">{mealError.carbsErr}</p>)}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="Enter Fat"
                name="fat"
                value={mealDetails.fat}
                onChange={handleInputChange}
                placeholder="31.1g"
                error={mealError?.fatErr}
              />
              {mealError?.fatErr && (<p className="text-red-600 text-xs ">{mealError.fatErr}</p>)}
            </div>
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="Enter Protein"
                name="protein"
                value={mealDetails.protein}
                onChange={handleInputChange}
                placeholder="31.1g"
                error={mealError?.proteinErr}
              />
              {mealError?.proteinErr && (<p className="text-red-600 text-xs ">{mealError.proteinErr}</p>)}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="col-span-2 md:col-span-1">
              <TextField
                inputType="number"
                label="Enter Calories"
                name="calories"
                value={mealDetails.calories}
                onChange={handleInputChange}
                placeholder="100 cal"
                error={mealError?.caloriesErr}
              />
              {mealError?.caloriesErr && (<p className="text-red-600 text-xs ">{mealError.caloriesErr}</p>)}
            </div>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex flex-col items-start gap-1">
              <div className="w-full flex items-center justify-between">
                <label className="text-sm font-medium">Instructions</label>
                <button
                  type="button"
                  className={`text-xs font-medium underline`}
                  onClick={addInstructionField}
                >
                  Add Instruction
                </button>
              </div>
              {instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between gap-6 lg:gap-3"
                >
                  <input
                    type="text"
                    placeholder="Instruction"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    value={instruction}
                    onChange={(e) =>
                      handleInstructionChange(index, e.target.value)
                    }
                  />
                  <div>
                    <button
                      type="button"
                      className="bg-red-100 text-white font-medium py-3 px-4 text-sm rounded-lg"
                      onClick={() => removeInstructionField(index)}
                    >
                      <FiTrash className="text-lg text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
              {mealError.instruction && (<p className="text-red-600 text-xs ">{mealError.instruction}</p>)}
            </div>
            <div className="w-full flex flex-col items-start gap-1">
              <div className="w-full flex items-center justify-between">
                <label className="text-sm font-medium">Ingredients</label>
                <button
                  type="button"
                  className={`text-xs font-medium underline`}
                  onClick={addIngredientField}
                >
                  Add Ingredient
                </button>
              </div>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between gap-6 lg:gap-3"
                >
                  <input
                    type="text"
                    placeholder="Ingredients"
                    className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
                    value={ingredient}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                  />
                  <div>
                    <button
                      type="button"
                      className="bg-red-100 text-white font-medium py-3 px-4 text-sm rounded-lg"
                      onClick={() => removeIngredientField(index)}
                    >
                      <FiTrash className="text-lg text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
              {mealError.ingredient && (<p className="text-red-600 text-xs ">{mealError.ingredient}</p>)}
            </div>
          </div>

          <div className="w-full flex items-center justify-end gap-4">
            <button
              disabled={btnLoading}
              className={`text-sm font-medium text-white ${styles.bgColor} rounded-lg px-4 py-2`}
            >
              {btnLoading ? "Creating... " : "Create Meal"}
            </button>
            <Link
            to="/meal-plans"
            className={`bg-red-500 text-white font-medium text-sm px-4 py-2 rounded-lg`}
          >
            Cancel
          </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMealPlan;
