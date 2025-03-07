const express = require('express')
const connect = require("./config/connectDb.js")
const dotenv = require('dotenv')
const route = require('./routes/index.js')
dotenv.config()
const bodyParser = require('body-parser')

const app = express()

connect()

app.use(bodyParser.urlencoded({ extended:true }))
const port = process.env.PORT || 8000




app.use("/api", route)


app.listen(port,()=>{
    console.log("server listening on port"+  port)
} )


