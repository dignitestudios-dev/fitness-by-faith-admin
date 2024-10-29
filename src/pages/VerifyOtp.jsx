import React, { useEffect, useState } from "react";
import { OTPMockup } from "../assets/export";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../styles/styles";
import { ErrorToaster, SuccessToaster } from "../components/Global/Toaster";
import Axios from "../axios";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("")
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOTP =async (e) => {
    e.preventDefault()
    try{
      setLoading(true);
      const {data} = await Axios.post("auth/sendPassOTP", {email});
      if(data.status === 200){
        SuccessToaster(data.message[0])
        setLoading(false)
        setTimer(60);
      }
      else{
        ErrorToaster(data.message[0])
        setLoading(false)
      }
    }catch(error){
      ErrorToaster(error.message)
      setLoading(false)
    }
  };

  const handleNavigate = async (e) => {
    e.preventDefault()
    try{
      setLoading(true);
      const {data} = await Axios.post("auth/validatePassOTP", {email,"code":otp});
      if(data.status === 200){
        SuccessToaster(data.message[0])
        setLoading(false)
        sessionStorage.setItem("resetToken", data?.data?.resetToken);
        navigate("/reset-password");
      }
      else{
        ErrorToaster(data.message[0])
        setLoading(false)
      }
    }catch(error){
      ErrorToaster(error.message)
      setLoading(false)
    }
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form className="space-y-6">
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Verify OTP</h3>
                <p className="text-sm mt-4">
                  Input the OTP code we've provided at your registered email.
                </p>
              </div>
              <div>
                <label className="text-sm mb-2 block">OTP Code</label>
                <div className="relative flex items-center">
                  <input
                    name="otp"
                    type="password"
                    required
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-none"
                    placeholder="OTP Code"
                    onChange={(e)=> setOtp(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                disabled={loading}
                  type="button"
                  onClick={handleNavigate}
                  className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white ${styles.bgColor} hover:opacity-85 focus:outline-none`}
                >
                  {loading? "Verifying...": "Verify OTP" }
                </button>
                {timer > 0 ? (
                  <p className="text-sm font-medium text-gray-400 text-center mt-4">
                    Time left: {timer} seconds
                  </p>
                ) : (
                  <p className="text-sm text-center mt-4 text-gray-400">
                    Didn't receive OTP?
                    <button
                      className="underline ml-1 text-black font-medium"
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </button>
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="lg:h-[550px] md:h-[400px] max-md:mt-10">
            <img
              src={OTPMockup}
              className="w-full h-full object-cover"
              alt="Authentication Mockup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
