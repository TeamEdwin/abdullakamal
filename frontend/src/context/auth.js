import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { getCookie } from "./helpers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // config axios
  // if (process.server) {
  axios.defaults.baseURL = process.env.API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth({
        user: JSON.parse(localStorage.getItem("user")),
        token: getCookie("token"),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
