var express = require('express')
var router = express.Router()

const { create_question, read_question, update_question, 
    delete_question } = require('../controllers/questionsController')

router.get('/', read_question)
router.put('/:id', update_question)
router.delete('/:id', delete_question)
router.post('/', create_question)

module.exports = router;