var express = require('express')
var router = express.Router()

const { create, read, update, destroy } = require('../controllers/settingsController')

// define the home page route
router.get('/settings', read)
router.put('/settings/:id', update)
router.delete('/settings/:id', destroy)
router.post('/settings', create)


module.exports = router