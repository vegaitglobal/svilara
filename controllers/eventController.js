const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

exports.create = async (req, res) => {
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