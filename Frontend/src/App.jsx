import React from 'react'
import {Routes,Route,Link,Navigate} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </div>
  )
}

export default App