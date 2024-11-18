const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const getAllWorkoutsAsync = async (req, res) => {
    try {
        const workoutModelList = await Workout.find();
        res.status(200).json(workoutModelList)
    } catch (error) {
        res.status(204).json({ error: error.message })
    }
}

const getWorkoutByIdAsync = async (req, res) => {
    const { id: workoutId } = req.params;

    if (!mongoose.isValidObjectId(workoutId)) {
        return req.status(400).json({ error: 'Invald workout id.' })
    }

    const workout = await Workout.findById(workoutId);

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }

    return res.status(200).json(workout)
}

const addWorkoutAsync = async (req, res) => {
    const { title, reps, load } = req.body;
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }
    try {
        if (req.body) {
            const workoutModel = await Workout.create({ title, reps, load });
            res.status(200).json(workoutModel)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkoutAsync = async (req, res) => {
    const { id: workoutId } = req.params;

    if (!mongoose.isValidObjectId(workoutId)) {
        return req.status(400).json({ error: 'Invald workout id.' })
    }

    const workout = await Workout.findByIdAndDelete({ _id: workoutId });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    return res.status(200).json(workout)
}

const updateWorkoutAsync = async (req, res) => {
    const { id: workoutId } = req.params;

    if (!mongoose.isValidObjectId(workoutId)) {
        return req.status(400).json({ error: 'Invald workout id.' })
    }
    const workout = await Workout.findByIdAndUpdate({ _id: workoutId }, {
        ...req.body
    });

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' })
    }
    return res.status(200).json(workout)
}

module.exports = {
    addWorkoutAsync,
    getAllWorkoutsAsync,
    getWorkoutByIdAsync,
    deleteWorkoutAsync,
    updateWorkoutAsync
}