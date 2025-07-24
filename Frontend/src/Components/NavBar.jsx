import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const NavBar = ({centerLink}) => {
  const BASE = import.meta.env.VITE_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();


  //---------------logout--------------------
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BASE}/logout`);
      console.log(res);
      navigate("/");
      toast.info("Logout successful.");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="fixed top-0 left-0 shadow z-50 bg-gray-900 p-7 flex justify-between w-full ">
      <h1 className="text-4xl  text-gray-300 font-bold">QnA Connect</h1>
      <Link
        to={`${centerLink}`}
        className="text-gray-300 text-2xl hover:text-blue-500 hover:underline"
      >{centerLink === "/feed"? "Explore Questions" : "Post Question"}
       
      </Link>
      <button
        onClick={handleLogout}
        className="text-2xl bg-red-600 rounded-md w-30 text-gray-100 pb-1 font-semibold hover:bg-red-800 hover:cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
