import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ pages }) => {
  const {name,email} = useContext(AuthContext);
  const sidebarRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const navigate = useNavigate()
  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    }
  },[])

  return (
    <div className="w-screen h-screen flex justify-start items-start">
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[70%] z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white border-r border-gray-100`}
        >
          <Sidebar />
        </div>
      </div>

      <div className="w-full relative lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)] h-full  overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between lg:justify-end px-4 z-20">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <div className="flex gap-3 items-center  py-4 font-normal text-gray-900">
            {/* <div className="relative bg-[#c00000]/[0.05] rounded-full h-10 w-10">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src={"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                alt=""
              />
            </div> */}
            <div className="text-sm flex flex-col justify-start items-start">
              <div className="font-semibold text-gray-700 leading-tight">
                {name}
              </div>
              <div className="text-gray-400">{email}</div>
            </div>
          </div>
        </div>
        <div className="w-full p-6 lg:px-8 bg-gray-50">{pages}</div>
      </div>
    </div>
  );
};

export default Layout;
