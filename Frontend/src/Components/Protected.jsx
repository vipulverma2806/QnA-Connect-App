import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Protected = ({ children }) => {
  const BASE = import.meta.env.VITE_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  async check ( )
  const res = await axios.get(`${BASE}/checkAuth`);
  console.log(res)
//   if (ok) return navigate("/NA");
  return children;
};

export default Protected;
