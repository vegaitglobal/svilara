var express = require('express')
var router = express.Router()

const { create, read, update, destroy } = require('../controllers/settingsController')
const { create_question, read_question, update_question, 
    delete_question } = require('../controllers/questionsController')

// define the home page route
router.get('/settings', read)
router.put('/settings/:id', update)
router.delete('/settings/:id', destroy)
router.post('/settings', create)

router.get('/questions', read_question)
router.put('/questions/:id', update_question)
router.delete('/questions/:id', delete_question)
router.post('/questions', create_question)


module.exports = router