require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//cors
app.use(cors({ origin: "http://localhost:3000/" }))

// routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for request 
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening to port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

