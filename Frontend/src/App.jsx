import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import PDash from "./Components/PDash";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Protected from "./Components/Protected";
import NA from './Components/NA'
import Feed from './Components/Feed'
const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {}, []);
  return (
    <div className="bg-gray-900 h-full min-h-screen">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/PDash" element={<Protected><PDash /></Protected>}></Route>
        <Route path="/NA" element={<NA/>}></Route>
        <Route path="/feed" element={<Feed/>}></Route>
        <Route path="/*" element={<Login/>}></Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />
    </div>
  );
};

export default App;
