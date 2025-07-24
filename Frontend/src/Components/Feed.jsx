import React from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Feed = () => {
  const BASE = import.meta.env.VITE_URL;
  axios.defaults.withCredentials = true;
  const [feedQues, setFeedQues] = useState([]);
  const [feedAns, setFeedAns] = useState([]);
  const [answer, setAnswer] = useState({});
  const [queId, setQueId] = useState("");
  //--------------get Question---------------
  const getQue = async () => {
    try {
      const allQue = await axios.get(`${BASE}/allQue`);
      setFeedQues(allQue.data);
    //   console.log(allQue);
    } catch (err) {
      console.log(err);
    }
  };
  //--------------get Answer--------
  const getAns = async () => {
    try {
      const allAns = await axios.get(`${BASE}/allAns`);
      setFeedAns(allAns.data);
    //   console.log(allAns);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getQue();
    getAns();
  }, []);
  //---------------post Ans------------------
  const handleGiveAns = async (e, queId) => {
    e.preventDefault();

    try {
      // console.log(answer)
      const ans = await axios.post(`${BASE}/postAns/${queId}`, {
        answer: answer[queId],
      });
      console.log(ans);
      setAnswer("");
      getAns();
      toast.success("Answer posted");
    } catch (err) {
      console.log(err);
      toast.error(`${err.response.data}`);
       setAnswer("");
    }
  };
  return (
    <div>
      <NavBar centerLink={`/PDash`}></NavBar>
      <div className="flex">
        <aside className="pt-25 pl-3 text-white w-1/4">
          {feedQues.map((que, i) => {
            return (
              <h1 className="text-md p-3 mb-3 bg-gray-800 rounded-xl truncate">
                {que.question}
              </h1>
            );
          })}
        </aside>
        <div className="w-3/4 pt-25">
          {feedQues.map((que, i) => {
            return (
              <div className="text-gray-200 bg-gray-800 mb-5 p-6 rounded-xl mx-5">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-gray-200 text-3xl font-bold">
                      Q. {que.question}
                    </h1>
                    <h2 className="text-gray-400 text-xl pl-5">
                         -{que.description}
                    </h2>
                  </div>
                  <div>
                    <p className="p-3">
                      <span>Posted by- {que.userId?.name}</span> at{" "}
                      {new Date(que.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div>
                  {feedAns
                    .filter((ans, i) => ans.queId === que._id)
                    .map((ans, i) => {
                      return (
                        <div className="bg-gray-700 rounded-xl p-4 m-4">
                          <h2 className="mb-3">{ans.answer}</h2>
                          <p>
                            <span>Posted by- {ans.userId?.name}</span> at{" "}
                            {new Date(ans.updatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      );
                    })}
                  <div className="rounded-xl p-2 m-4 bg-gray-700">
                    <form
                      onSubmit={(e) => handleGiveAns(e, que._id)}
                      className="flex"
                    >
                      <input
                        type="text"
                        placeholder="Give your Answer here"
                        value={answer[que._id] || ""}
                        className="w-full p-2 text-md text-gray-200  placeholder-gray-400 "
                        onChange={(e) =>
                          setAnswer((prev) => ({
                            ...prev,
                            [que._id]: e.target.value,
                          }))
                        }
                        required
                      />
                      <button
                        className="bg-blue-600 rounded text-md text-gray-200 w-36  hover:bg-blue-800 mx-2 my-1 hover:cursor-pointer"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feed;


