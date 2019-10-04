const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

exports.create = async (req, res) => {

}

exports.update = async (req, res) => {

}

exports.read = async (req, res) => {
    let [err, settings] = await to(
        models.Settings.findAll()
    );
    if (err) {
        console.log(err)
        return ReE(res, {
            msg: 'Something went wrong'
        })
    }
    return ReS(res, {
        data: settings
    });
}

exports.delete = async (req, res) => {
    let [err, settings] = await to(
        models.Settings.findOne({
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
        data: settings
    });
}

