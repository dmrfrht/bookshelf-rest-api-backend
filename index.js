const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 9090
const dbcon = process.env.CLOUD_MONGODB_CON

const app = new express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(dbcon, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})

const con = mongoose.connection

if (!con) console.log("mongodb connection failed")
else console.log("mongodb connection successful")

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(port, () => {
  console.log("uygulama ayağa kalktı")
})