const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const PlantList = require('../models/plantList.js');
const Profile = require('../models/profile.js');
const User = require('../models/user.js')
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

//To create the plant and add it to the profile schema
router.post('/', async (req, res) => {
    try {
        const plant = await PlantList.create(req.body)

        const user = await User.findById(req.user._id);
        const profile = await Profile.findOneAndUpdate(
            {username: user._id}, 
            {$push: {plantList: plant._id}}
        )
        
        res.status(201).json({plant, profile})
    } catch (err) {
        res.status(500).json(error);
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

router.get('/:plantId', async (req, res) => {
    try {
        const plant = await PlantList.findById(req.params.plantId)
        res.status(200).json(plant)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router;