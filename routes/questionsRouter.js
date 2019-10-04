var express = require('express')
var router = express.Router()

const { create_question, read_question, update_question, 
    delete_question } = require('../controllers/questionsController')

router.get('/questions', read_question)
router.put('/questions/:id', update_question)
router.delete('/questions/:id', delete_question)
router.post('/questions', create_question)

module.exports = router;