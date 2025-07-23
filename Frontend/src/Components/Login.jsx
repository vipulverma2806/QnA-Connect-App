import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  //------------------Login-------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/login", login);
      console.log(res);
      setLogin({
        email: "",
        password: "",
      });
      toast.success("Login successful.");
      if (res.status === 202) return navigate("/PDash");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 flex flex-col p-6  rounded-2xl space-y-5 max-w-sm w-full"
      >
        <h1 className="text-gray-100 text-center text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="placeholder-gray-400 w-full text-gray-200 p-3 rounded-2xl  bg-gray-700"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value.trim() })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="placeholder-gray-400 text-gray-200  w-full p-3 rounded-2xl  bg-gray-700"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-700 rounded-2xl p-3 hover:bg-blue-800 hover:cursor-pointer text-white w-full"
        >
          Submit
        </button>
        <p className="text-gray-200 ">
          Don't have an account :{" "}
          <Link to="/register" className="hover:underline text-blue-500">
            {" "}
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
