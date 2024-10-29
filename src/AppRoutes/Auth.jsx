import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  
  useEffect(() => {
    // Redirect based on isLoggedIn state
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [token, navigate]); // Empty dependency array ensures useEffect runs only once after mount

  return <div></div>;
};

export default Auth;
