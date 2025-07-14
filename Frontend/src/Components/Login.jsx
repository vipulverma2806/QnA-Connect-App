import React from 'react'
import { Link } from 'react-router-dom';
const Login = () => {
 return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <form className="bg-gray-800 flex flex-col p-6  rounded-2xl space-y-5 max-w-sm w-full">
        <h1 className="text-gray-100 text-center text-2xl font-bold">Login</h1>
       
         <input
          type="text"
          placeholder="Email"
          className="placeholder-gray-400 w-full p-3 rounded-2xl  bg-gray-700"
        />
         <input
          type="text"
          placeholder="Password"
          className="placeholder-gray-400 w-full p-3 rounded-2xl  bg-gray-700"
        />
        <button className="bg-blue-500 rounded-2xl p-3 text-white w-full">Submit</button>
        <p className="text-gray-200 ">Don't have an account : <Link to='/register' className="hover:underline text-blue-500"> Register</Link></p>
      </form>
    </div>
  );
}

export default Login