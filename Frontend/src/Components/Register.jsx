import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ENV = import.meta.env;
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ENV.VITE_URL}/register`, form);
      console.log(response.data);
      setForm({
        name: "",
        email: "",
        password: "",
      });
      toast.success("Registration Successful.");
      navigate("/")
    } catch (err) {}
  };
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 flex flex-col p-6  rounded-2xl space-y-5 max-w-sm w-full"
      >
        <h1 className="text-gray-100 text-center text-2xl font-bold">
          Register
        </h1>
        <input
          type="text"
          placeholder="Name"
          className="placeholder-gray-400 text-gray-100 w-full p-3 rounded-2xl  bg-gray-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="placeholder-gray-400 w-full p-3 text-gray-100 rounded-2xl  bg-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="placeholder-gray-400 w-full p-3 text-gray-100 rounded-2xl  bg-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          value={form.password}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 rounded-2xl p-3 hover:bg-blue-700 hover:cursor-pointer text-white w-full"
        >
          Submit
        </button>
        <p className="text-gray-200 ">
          Already have an account :{" "}
          <Link to="/" className="hover:underline text-blue-500">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
