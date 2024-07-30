const mongoose = require("mongoose")

const whenToFertilizeSchema = new mongoose.Schema({
  dateOfDay: {
    type: Date,
  },
})

const whenToWaterSchema = new mongoose.Schema({
  dateOfDay: {
    type: Number,
    min: 1,
    max: 31,
  },
  conditionOfSoil: {
    type: String,
  },
})

const plantListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  whenToWater: [whenToWaterSchema],
  whenToFertilize: [whenToFertilizeSchema],
  howMuchSun: {
    type: Number,
  },
  typeOfLight: {
    type: String,
    enum: [
        "Direct Sunlight",
        "Indirect Light",
        "Medium Light",
        "Low Light",
        "Full Sun",
        "Partial Sun",
        "Full Shade"
    ],
  },
  bestSeasonToPlant: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
  indoorOutdoor: {
    type: String,
    enum: ["Indoor", "Outdoor"],
  },
  growTime: {
    type: String,
  },
})

const PlantList = mongoose.model("Plant List", plantListSchema)

module.exports = PlantList
