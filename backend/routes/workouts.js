const express = require('express')
const {
    addWorkoutAsync,
    getAllWorkoutsAsync,
    getWorkoutByIdAsync,
    deleteWorkoutAsync,
    updateWorkoutAsync
} = require('../controllers/workoutController')

const router = express.Router()

//GET All workouts
router.get('/', getAllWorkoutsAsync)

//GET single workout
router.get('/:id', getWorkoutByIdAsync)

//POST a workout
router.post('/', addWorkoutAsync)

//DELETE a workout
router.delete('/:id', deleteWorkoutAsync)

//UPDATE a workout
router.patch('/:id', updateWorkoutAsync)

module.exports = router