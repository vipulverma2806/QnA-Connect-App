import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const Protected = ({ children }) => {
  const BASE = import.meta.env.VITE_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${BASE}/checkAuth`);
      console.log("working");

      if (res.data) return setAuth(true);
      if (!auth) return <Navigate to="/"></Navigate>;
    } catch (err) {
      console.log(err);
    }
  };

  return children;
};

export default Protected;
