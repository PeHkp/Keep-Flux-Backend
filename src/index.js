const express = require("express")
const routes = require("./routes")
const path = require('path')
const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use("/uploads",express.static(path.resolve(__dirname,"..","uploads")));

app.listen(process.env.PORT || 8080)