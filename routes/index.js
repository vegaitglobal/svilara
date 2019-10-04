var express = require('express')
var router = express.Router()

const { createSettings, readSettings, updateSettings, destroySettings } = require('../controllers/settingsController')
const { create_question, read_question, update_question, 
    delete_question } = require('../controllers/questionsController')

// define the home page route
router.get('/settings', readSettings)
router.put('/settings/:id', updateSettings)
router.delete('/settings/:id', destroySettings)
router.post('/settings', createSettings)

router.get('/questions', read_question)
router.put('/questions/:id', update_question)
router.delete('/questions/:id', delete_question)
router.post('/questions', create_question)


module.exports = router