import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginImage } from "../assets/export";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { styles } from "../styles/styles";
import Axios from "../axios"
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../context/AuthContext";
import { ErrorToaster, SuccessToaster } from "../components/Global/Toaster";

const Login = () => {
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // const { isLoggedIn, setIsLoggedIn, ToggleUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await Axios.post("auth/emailSignIn", formData);
      if(response.data.status === 200){
        navigate("/dashboard")
        login(response?.data?.data[0]);
        SuccessToaster("Login Successfully")
      }
      else if(response.data.status === 401){
        ErrorToaster(response?.data?.message[0])
      }
    } catch (error) {
      console.log("err -> ", error)
      ErrorToaster(error.message)
    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
    }
  },[])

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="rounded-md p-6 lg:p-10 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-6">
                <h3 className="text-3xl font-extrabold">Sign in</h3>
                <p className="text-sm mt-4">Sign in to your account.</p>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                <input
                    name="email"
                    type="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-md outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <div className="relative flex items-center border justify-start border-gray-300 rounded-md px-4">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-sm py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={(e) => {setShowPass(!showPass);}}
                  >
                    {showPass ? (
                      <LuEyeOff className="text-lg text-gray-400" />
                    ) : (
                      <LuEye className="text-lg text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-start gap-2">
                <div className="text-sm">
                  <Link
                    to="/verify-email"
                    className="text-[#028EE6] hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="!mt-4">
                <button
                  disabled={loading}
                  type="submit"
                  className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white ${styles.bgColor} hover:bg-opacity-85 focus:outline-none`}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[550px] md:h-[400px] max-md:mt-10">
            <img
              src={LoginImage}
              className="w-full h-full object-cover"
              alt="Authentication Mockup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
