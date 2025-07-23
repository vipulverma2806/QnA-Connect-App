import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
const PDash = () => {
  const BASE = import.meta.env.VITE_URL;
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    question: "",
    description: "",
  });
  const [allQue, setAllQue] = useState([]);
  const [editId, setEditId] = useState();

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
  //-------------------post Question-----------
  const postQue = async () => {
    try {
      const res = await axios.post(`${BASE}/postQue`, form);
      console.log(res);
      getQue();
    } catch (err) {
      console.log(err);
    }
  };
  //--------------get Question--------
  const getQue = async () => {
    try {
      const allQue = await axios.get(`${BASE}/getQue`);
      setAllQue(allQue.data);
      console.log(allQue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQue();
  }, []);

  //----------------Delete Question--------------
  const handleDelete = async (id) => {
    try {
      const deleted = await axios.delete(`${BASE}/delete/${id}`);
      console.log(deleted);
      getQue();
      toast.info("Deleted Successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  //----------------Edit Question--------------
  const handleEdit = async (e) => {
    e.preventDefault();

    console.log("working");
    try {
      const edited = await axios.put(`${BASE}/edit/${editId}`, form);
      console.log(edited);
      getQue();
      toast.success("Edited Successfully.");
      setForm({
        question: "",
        description: "",
      });
      setEditId()
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-900 pt-25 pb-10 px-10">
      <nav className="fixed top-0 left-0 shadow z-50 bg-gray-900 p-7 flex justify-between w-full ">
        <h1 className="text-4xl  text-gray-300 font-bold">QnA Connect</h1>
        <Link
          to="/feed"
          className="text-gray-300 text-2xl hover:text-blue-500 hover:underline"
        >
          Explore Questions
        </Link>
        <button
          onClick={handleLogout}
          className="text-2xl bg-red-600 rounded-md w-30 text-gray-100 pb-1 font-semibold hover:bg-red-800 hover:cursor-pointer"
        >
          Logout
        </button>
      </nav>
      <form
        onSubmit={editId ? handleEdit : postQue}
        className="bg-gray-800 rounded-2xl p-5 gap-y-5 grid"
      >
        <div className="w-full rounded  bg-gray-700">
          <input
            type="text"
            placeholder="Ask your Question here"
            value={form.question}
            className="w-full p-3 text-xl text-gray-200  placeholder-gray-400 "
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />
        </div>
        <div className="w-full  rounded  bg-gray-700">
          <textarea
            type="text"
            placeholder="Description"
            value={form.description}
            className="w-full p-3 text-xl text-gray-200 placeholder-gray-400 "
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>
        <div>
          <button
            className="bg-blue-600 rounded text-xl text-gray-200 w-36  hover:bg-blue-800 px-3 py-1 m-1 hover:cursor-pointer"
            type="submit"
          >
            {editId ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {allQue.map((que, i) => {
        return (
          <div className="bg-gray-800 mt-5 rounded-2xl text-gray-200 p-5 gap-y-3 grid">
            <h2 className="font-bold text-2xl">{que.question}</h2>
            <p className="font-semibold text-xl">{que.description}</p>
            <p className=" text-md">
              - {new Date(que.updatedAt).toLocaleString()}
            </p>
            <div>
              <button
                onClick={() => {
                  setEditId(que._id);
                  setForm({
                    question: que.question,
                    description: que.description,
                  });
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="bg-yellow-600 rounded  hover:bg-yellow-800 hover:cursor-pointer text-xl px-3 py-1 m-1 "
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(que._id)}
                className="bg-red-600 rounded text-xl  hover:bg-red-800 px-3 py-1 m-1 hover:cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PDash;
