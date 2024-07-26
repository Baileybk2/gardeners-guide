const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const PlantList = require('../models/plantList.js');
const Profile = require('../models/profile.js');
const User = require('../models/user.js')
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);

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
        console.log(err)
    }
})
module.exports = router;