import React, { Fragment, useEffect, useRef, useState } from "react";
import { styles } from "../styles/styles";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "../axios";
import Loader from "../components/Global/Loader";
import {FiTrash } from "react-icons/fi";
import { ErrorToaster, SuccessToaster } from "../components/Global/Toaster";
import Uploader from "../components/Global/Uploader";
import ConfirmationDialog from "../components/Global/ConfirmationDialog";

const MealDetailsPage = () => { 
  const { id } = useParams();
  const navigate = useNavigate()
  const [image, setImage] = useState(null);
  const [imgAddress, setImgAddress] = useState("");

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
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
      const { data } = await Axios.delete(`meal/delete/${id}`);
      if (data.status === 200) {
        SuccessToaster(data?.message[0])
        setShowModal(false)
        navigate("/meal-plans")
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

  const [instructions, setInstructions] = useState([""]);

  const addInstructionField = () => {
    setInstructions([...instructions,""]);
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
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
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    const updatedInstructions = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedInstructions);
  };

  const handleProfileImg = () => {
    fileInputRef.current.click();

  };

  const handleProfileChange = async (e) => {
    setImage(e.target.files[0]);
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
        console.error("Error->", error.message);
        setImgLoading(false);
      }
    }
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const apiData={ 
      "url" : imgAddress,
      "title" : mealDetails.title,
      // "description": mealDetails.description,
      "serving" : "1",
      "carbs" : mealDetails.carbs,
      "protein" : mealDetails.protein,
      "fat" : mealDetails.fat,
      "calories" : mealDetails.calories,
      "prepTime" : mealDetails.prepTime,
      "servingSize" : mealDetails.servingSize,
      "numServing" : mealDetails.numberOfServings,
      "ingredients": ingredients,
      "instructions" : instructions,
      "category": mealDetails.category
    }
    try{
      const {data} = await Axios.put(`meal/update/${id}`, apiData)
      if (data.status === 200) {
        SuccessToaster(data.message[0]);
        setBtnLoading(false);
        setEditable(false);
        // navigate("/workout-plans");
      } else {
        setBtnLoading(false);
        ErrorToaster(data.message[0]);
      }
    }catch(error){
      ErrorToaster(error.message)
      console.log("Error is: ", error)
    }
  };

  const [mealDetails, setMealDetails] = useState({
    title: "",
    description: "",
    category: "",
    carbs: 0,
    fat: 0,
    protein: 0,
    calories: 0,
    prepTime: 0,
    servingSize: 0,
    numberOfServings: 0,
    ingredients: [],
    instructions: [],
  });

  const [editable, setEditable] = useState(false);

  const toggleEditable = (e) => {
    setEditable(!editable);
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealDetails({
      ...mealDetails,
      [name]: value,
    });
  };

  const getMealDetail = async (workoutId) => {
    try {
      setLoading(true);
      const { data } = await Axios.get(`meal/getOne/${workoutId}?isSession=false`);
      if (data.status === 200) {
        const mealData = data?.data;
        setMealDetails({
          title: mealData.title,
          description: mealData.description,
          category: mealData.category,
          carbs: mealData.carbs || 0,
          fat: mealData.fat || 0,
          protein: mealData.protein || 0,
          calories: mealData.calories || 0,
          prepTime: mealData.prepTime || 0,
          servingSize: mealData.servingSize || 0,
          numberOfServings: mealData.numServing || 0,
          ingredients: mealData.ingredients || [],
          instructions: mealData.instructions || [],
        });
        setInstructions(mealData.instructions)
        setIngredients(mealData.ingredients)
        setImgAddress(mealData.url)
        setLoading(false)
      }
    }
    catch(error){
      console.log(" getWorkoutDetail ~ error:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getMealDetail(id);
  }, [id]);

  return (
    <div className="">
      <ConfirmationDialog showModal={showModal} onclick={handleModal} action={handleDelete} loading={deleteLoad} title="Are you sure?" text="You Won't be able to revert this"/>
      {editable ? (
        <h1 className="text-xl font-semibold mb-4">Edit Meal</h1>
      ) : (
        <h1 className="text-xl font-semibold mb-4">Meal Details</h1>
      )}
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="w-full bg-white p-6 rounded-xl"
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
                      src={imgAddress ? imgAddress : image}
                      className="w-full h-full rounded-xl object-contain"
                    />
                  </div>
                )}
              </Fragment>
            ) : (
              <img
                src={imgAddress ? imgAddress : image}
                alt="workout-image"
                className="w-full h-60 md:h-80 rounded-xl object-contain"
              />
            )}
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Meal Title</label>
              <input
                type="text"
                name="title"
                value={mealDetails.title}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Meal Category</label>
              <select
                name="category"
                value={mealDetails.category}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              >
                <option value="Select Category">Select Category</option>
                <option value="Vegan">Vegan</option>
                <option value="LowCarbs">Low carbs</option>
                <option value="HighCarbs">High carbs</option>
                <option value="HighProtein">High Protein</option>
              </select>
            </div>
            {/* <div className="w-full">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                value={mealDetails.description}
                onChange={handleChange}
                name="description"
                id="description"
                rows={"5"}
                placeholder="Write some description..."
                className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              ></textarea>
            </div> */}
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Carbs (g)</label>
              <input
                type="number"
                name="carbs"
                value={mealDetails.carbs}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Fat (g)</label>
              <input
                type="number"
                name="fat"
                value={mealDetails.fat}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Protein (g)</label>
              <input
                type="number"
                name="protein"
                value={mealDetails.protein}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Calories</label>
              <input
                type="number"
                name="calories"
                value={mealDetails.calories}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Prep. Time (min)</label>
              <input
                type="number"
                name="prepTime"
                value={mealDetails.prepTime}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">Serving Size</label>
              <input
                type="number"
                name="servingSize"
                value={mealDetails.servingSize}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <label className="text-sm font-medium">No. of Servings</label>
              <input
                type="number"
                name="numberOfServings"
                value={mealDetails.numberOfServings}
                onChange={handleChange}
                className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                  !editable && "bg-gray-50"
                }`}
                disabled={!editable}
              />
            </div>
          </div>
          {editable ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                    className="w-full flex items-center justify-between gap-6 lg:gap-3 mb-2"
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
                      placeholder="Instruction"
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
              </div>
            </div>
          ) : (
            <Fragment>
              <div className="mb-6">
                <label className="text-sm font-medium">Ingredients</label>
                <textarea
                  name="ingredients"
                  value={mealDetails.ingredients}
                  onChange={handleChange}
                  className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                    !editable && "bg-gray-50"
                  }`}
                  disabled={!editable}
                />
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium">Instructions</label>
                <textarea
                  name="instructions"
                  value={mealDetails.instructions}
                  onChange={handleChange}
                  className={`appearance-none w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] ${
                    !editable && "bg-gray-50"
                  }`}
                  disabled={!editable}
                />
              </div>
            </Fragment>
          )}
          <div className="flex items-center justify-between">
            <div className="w-full">
              {editable ? (
                <div className="w-full flex justify-end bg-white rounded-b-xl items-center gap-4 py-2">
                  <button
                    disabled={btnLoading}
                    type="submit"
                    className={`${styles.bgColor} text-white font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:shadow-outline float-end`}
                  >
                    {btnLoading ? "Updating... " : "Update Meal"}
                  </button>
                  <button
                    onClick={() => setEditable(false)}
                    className={`bg-red-600 text-white text-sm font-medium px-3 py-2 rounded-lg`}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="w-full flex justify-end py-2">
                  <button
                    disabled={deleteLoad}
                    onClick={(e) => handleModal(e)}
                    className={`bg-red-600 text-white px-4 mr-2 font-medium py-2 rounded-lg text-sm focus:outline-none focus:shadow-outline float-end`}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className={`${styles.bgColor} text-white font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:shadow-outline float-end`}
                    onClick={(e) => toggleEditable(e)}
                  >
                    Edit Meal
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default MealDetailsPage;
