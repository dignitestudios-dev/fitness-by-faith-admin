import React, { useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { styles } from "../styles/styles";
import Axios from "../axios"
import { ErrorToaster, SuccessToaster } from "../components/Global/Toaster";

const ChangePassword = () => {
  let email = localStorage.getItem('email');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false)

  const handleNewPasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Password does not match");
    } else {
      setPasswordError("");
    }
  };
  
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Password does not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentPassword === "" || password === "" || confirmPassword === "") {
      setPasswordError("Fill the missing field");
      return
    } else if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setBtnLoading(true)
      try{
        let apiData = {
          currentPassword,
          password,
          confirmPassword,
          email
        }
        const {data} = await Axios.post("auth/updatePass", apiData)
        if(data.status === 200){
          SuccessToaster(data.message[0])
          setBtnLoading(false)
        }
        else{
          ErrorToaster(data.message[0])
          setBtnLoading(false)
        }
      }
      catch(error){
        ErrorToaster(error.message)
        setBtnLoading(false)
      }
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-semibold">Update your password</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 bg-white rounded-xl p-6 flex flex-col gap-6 mt-6"
      >
        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="current-password" className="text-sm font-medium">
            Current Password
          </label>
          <div
            tabIndex={1}
            className="w-full focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] flex items-center justify-between border rounded-lg px-3"
          >
            <input
              type={showCurrentPassword ? "text" : "password"}
              name="current-password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border-none  py-3 text-sm outline-none"
            />
            <span onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? (
                <LuEye className="text-gray-500" />
              ) : (
                <LuEyeOff className="text-gray-500" />
              )}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="new-password" className="text-sm font-medium">
            New Password
          </label>
          <div
            tabIndex={1}
            className="w-full focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] flex items-center justify-between border rounded-lg px-3"
          >
            <input
              type={showPass1 ? "text" : "password"}
              name="new-password"
              id="new-password"
              value={password}
              onChange={handleNewPasswordChange}
              className="w-full border-none  py-3 text-sm outline-none"
            />
            <span onClick={() => setShowPass1(!showPass1)}>
              {showPass1 ? (
                <LuEye className="text-gray-500" />
              ) : (
                <LuEyeOff className="text-gray-500" />
              )}
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm Password
          </label>
          <div
            tabIndex={1}
            className="w-full focus:ring-[#64B5AC] focus:border-[#64B5AC] outline-[#64B5AC] flex items-center justify-between border rounded-lg px-3"
          >
            <input
              type={showPass2 ? "text" : "password"}
              name="confirm-password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full border-none  py-3 text-sm outline-none"
            />
            <span onClick={() => setShowPass2(!showPass2)}>
              {showPass2 ? (
                <LuEye className="text-gray-500" />
              ) : (
                <LuEyeOff className="text-gray-500" />
              )}
            </span>
          </div>
          {passwordError && (
          <p className="text-red-600 text-xs ">{passwordError}</p>
          )}
        </div>
        <div>
          <button
          disabled={btnLoading}
            type="submit"
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${styles.bgColor}`}
          >
            {btnLoading ? "Updating...": "Update Password"} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
