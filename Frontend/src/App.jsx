import React from 'react'
import {Routes,Route,Link,Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import PDash from './Components/PDash'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const App = () => {
  const [auth,setAuth] = useState(false);


  useEffect(()=>{
    
  },[])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/PDash" element={<PDash/>}></Route>
        <Route></Route>
      </Routes>
    </div>
  )
}

export default App