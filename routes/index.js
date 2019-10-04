var express = require('express')
var router = express.Router()

const { read, update } = require('../controllers/SettingsController')

// define the home page route
router.get('/settings', read)
router.put('/settings/:id', update)
module.exports = router