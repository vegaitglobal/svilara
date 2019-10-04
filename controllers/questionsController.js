const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

exports.create_question = async (req, res) => {
    
}

exports.update_question = async (req, res) => {
    let [err, question] = await to(
        models.Question.findOne({
            where: {
                id: req.params.id
            }
        })
    );

    question.update({
        /*text: sanitizeBody(req.body.text),
        fieldType: sanitizeBody(req.body.fieldTypes),
        values: sanitizeBody(req.body.values),
        order: sanitizeBody(req.body.order),
        mandatory: sanitizeBody(req.body.mandatory)*/
    })
    // console.log(question)
    // question.key = req.body.
    if (err) {
        console.log(err)
        return ReE(res, {
            msg: 'Something went wrong'
        })
    }
    return ReS(res, {
        msg: 'Update successfull.'
    })
}

exports.read_question = async (req, res) => {
    let [err, question] = await to(
        models.Question.findAll()
    );
    if (err) {
        console.log(err)
        return ReE(res, {
            msg: 'Something went wrong'
        })
    }
    return ReS(res, {
        data: question
    });
}

exports.delete_question = async (req, res) => {
    let [err, question] = await to(
        models.Question.findOne({
            where: {
                id: req.params.id
            }
        })
    );
    if (err) {
        return ReE(res, {
            msg: 'Something went wrong'
        })
    }
    return ReS(res, {
        data: question
    });
}

