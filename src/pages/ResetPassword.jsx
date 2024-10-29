import React, { useEffect, useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { ResetPasswordMockup } from "../assets/export";
import { styles } from "../styles/styles";
import { ErrorToaster, SuccessToaster } from "../components/Global/Toaster";
import Axios from "../axios"

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetToken , setResetToken] = useState("")
  const [email, setEmail] = useState("");
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
      setPasswordError("Passwords does not match");
    } else {
      setPasswordError("");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("resetToken");
    const storedEmail = sessionStorage.getItem("email");
    if (token && storedEmail) {
      setResetToken(token);
      setEmail(storedEmail)
    }
  }, []);

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      setBtnLoading(true)
      let apiData = {
        password,
        confirmPassword,
        email,
        resetToken
      }
      const {data} = await Axios.post("auth/updatePassOTP", apiData)
      if(data.status === 200){
        SuccessToaster(data.message[0])
        setBtnLoading(false)
        navigate("/login");
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
  };
  
  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold">Update Password.</h3>
                <p className="text-sm mt-4">Update your password!</p>
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
              <div className="mt-4">
                <button
                  type="submit"
                  className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white ${styles.bgColor} hover:opacity-85 focus:outline-none`}
                >
                  {btnLoading ? "Updating...":"Update Password"}
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[550px] md:h-[400px] max-md:mt-10">
            <img
              src={ResetPasswordMockup}
              className="w-full h-full object-cover"
              alt="Authentication Mockup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
