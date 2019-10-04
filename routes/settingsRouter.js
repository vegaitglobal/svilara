var express = require('express')
var router = express.Router()

const { createSettings, readSettings, updateSettings, destroySettings } = require('../controllers/settingsController')

// define the home page route
router.get('/settings', readSettings)
router.put('/settings/:id', updateSettings)
router.delete('/settings/:id', destroySettings)
router.post('/settings', createSettings)

module.exports = router