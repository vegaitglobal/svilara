var express = require('express')
var router = express.Router()

const { createSettings, readSettings, updateSettings, destroySettings } = require('../controllers/settingsController')

// define the home page route
router.get('/', readSettings)
router.put('/:id', updateSettings)
router.delete('/:id', destroySettings)
router.post('/', createSettings)

module.exports = router