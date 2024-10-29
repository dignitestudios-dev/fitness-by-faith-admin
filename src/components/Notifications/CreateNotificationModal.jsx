import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { styles } from "../../styles/styles";
import TextField from "../Global/TextField";
import { ErrorToaster, SuccessToaster } from "../Global/Toaster";
import Axios from "../../axios"
const CreateNotificationModal = ({ showModal, onclick }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ title: '', description: '' });

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setTitle(value);
      setErrors((prev) => ({ ...prev, title: '' }));
    } else {
      setErrors((prev) => ({ ...prev, title: 'Title cannot exceed 20 characters' }));
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setDescription(value);
      setErrors((prev) => ({ ...prev, description: '' }));
    } else {
      setErrors((prev) => ({ ...prev, description: 'Description cannot exceed 200 characters' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!title){
      setErrors({title: 'Title is required'})
      return;
    }
    if(!description){
      setErrors({description: 'Description is required'})
      return;
    }
    const payload = {
      title: title,
      message: description,
    };

    try {
      setLoading(true);
      const {data} = await Axios.post('notification/admin/Send', payload);
      if (data.status === 200) {
        SuccessToaster(data.message[0])
        onclick();
        setDescription("")
        setTitle("")
        setErrors({})
      }
      else{
        ErrorToaster(data.message[0])
      }
    } catch (error) {
      console.error('Error sending notification:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    showModal && (
      <div className="w-screen h-screen fixed top-0 bottom-0 right-0 left-0 px-4 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-[530px] p-4 lg:px-6 lg:py-5 h-[420px] bg-white rounded-lg relative flex flex-col justify-between"
        >
          <button
            type="button"
            className="absolute top-5 right-6"
            onClick={onclick}
          >
            <IoIosCloseCircle className="w-6 h-6 text-gray-400" />
          </button>
          <h1 className="font-semibold">Create Push Notification</h1>

          <TextField
            label={"Title"}
            inputType={"text"}
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-xs -mt-4">{errors.title}</p>
          )}
          <div className="w-full flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium">
              Description{" "} <span className="text-gray-600 text-xs">(Do not break the line)</span>
            </label>
            <textarea
              name="description"
              id="description"
              rows={"5"}
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC]"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          <div className="w-full">
            <button
              type="submit"
              disabled={loading}
              className={`${styles.bgColor} text-white font-medium text-sm rounded-lg w-full py-2.5`}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CreateNotificationModal;
