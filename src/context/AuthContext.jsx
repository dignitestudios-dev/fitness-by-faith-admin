import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem('name'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [uid, setUid] = useState(localStorage.getItem('uid'))

  const login = (data) => {
    if(data){
      localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.userRecord.fullName);
    localStorage.setItem("email", data.userRecord.email);
    localStorage.setItem("uid", data.userRecord.uid);
    setToken(data.token);
    setName(data.userRecord.fullName);
    setEmail(data.userRecord.email);
    setUid(data.userRecord.uid)
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setToken(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, uid, email, name }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
