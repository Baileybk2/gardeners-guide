const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const PlantList = require('../models/plantList.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========

router.use(verifyToken);


module.exports = router;