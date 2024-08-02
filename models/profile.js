const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plantList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlantList'
    }]
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile