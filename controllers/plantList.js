const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const PlantList = require('../models/plantList.js')
const Profile = require('../models/profile.js')
const User = require('../models/user.js')
const router = express.Router()

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

//To create the plant and add it to the profile schema
router.post('/', async (req, res) => {
    try {
        const plant = await PlantList.create(req.body)

        //push plant._id into profile schema
        const profile = await Profile.findOneAndUpdate(
            {user: req.user._id}, 
            {$push: {plantList: plant._id}}
        )
        
        res.status(201).json({plant, profile})
    } catch (err) {
        res.status(500).json(err)
    }
})

//to show all plants
router.get('/', async (req, res) => {
    try {
        const allThePlants = await PlantList.find({})
        res.status(200).json(allThePlants)
    } catch (err) {
        res.status(500).json(err)
    }
})

//to show a specific plant
router.get('/:plantId', async (req, res) => {
    try {
        const plant = await PlantList.findById(req.params.plantId)
        res.status(200).json(plant)
    } catch (err) {
        res.status(500).json(err)
    }
})

//to update a plant 
router.put('/:plantId', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user._id})

        if (!profile.user.equals(req.user._id)) {
            return res.status(403).send("Not allowed to do that.")
        }

        const updatedPlant = await PlantList.findByIdAndUpdate(
           req.params.plantId, 
           req.body,
           {new: true}
        )

        res.status(200).json(updatedPlant)
    } catch (err) {
        res.status(500).json(err)
    }
})

//to delete a plant
router.delete('/:plantId', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user._id})

        if (!profile.user.equals(req.user._id)) {
            return res.status(403).send("Not allowed to do that.")
        }

        const deletedPlant = await PlantList.findByIdAndDelete(req.params.plantId)

        res.status(200).json(deletedPlant)
    } catch (err) {
        res.status(500).json(err)
    }
})

//to add whenToWater for plant at plantId
router.post('/:plantId/water', async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user._id})

        if (!profile.user.equals(req.user._id)) {
            return res.status(403).send("Not allowed to do that.")
        }

        const plant = await PlantList.findById(req.params.plantId)
        plant.whenToWater.push(req.body)
        await plant.save()
        res.status(201).json(plant)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router