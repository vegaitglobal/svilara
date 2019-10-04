var express = require('express')
var router = express.Router()

const {read} = require('../controllers/SettingsController')

// define the home page route
router.get('/settings', read)

module.exports = router