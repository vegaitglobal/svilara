const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

exports.createSettings = async (req, res) => {
    let [err, settings] = await to(
        models.Settings.create({
            key: req.body.key,
            value: req.body.value,
        })
    );
    if (err) {
        console.log(err)
        return ReE(res, {
            msg: 'Something went wrong'
        })
    }
    return ReS(res, {
        msg: 'Successfully created',
        data: settings
    });
}
exports.updateSettings = async (req, res) => {
    let [err, settings] = await to(
        models.Settings.findOne({
            where: {
                id: req.params.id
            }
        })
    );

    settings.update({
        key: req.body.key,
        value: req.body.value
    })

    if (err) {
        return ReE(res, {
            msg: 'Something went wrong'
        })
    }
    return ReS(res, {
        msg: 'Update successfull.'
    })
}

exports.readSettings = async (req, res) => {
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

exports.destroySettings = async (req, res) => {
    let [err, settings] = await to(
        models.Settings.destroy({
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
        msg: "Deleted successfully."
    });
}

