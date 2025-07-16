const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express();
app.use(express.json())
app.use(cors())




app.post('/register',async(req,res)=>{
    res.json("ok")
})

app.listen('4000',()=> console.log("server running on port 4000"))
