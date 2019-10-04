const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

// GET EVENTs
exports.getEvents = async function(req, res) {
  let [err, dbDevices] = await to(models.Event.findAll({}));

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    data: dbDevices
  });
};

// GET DEVICES
exports.createEvent = async function(req, res) {
  let [err, dbCreated] = await to(models.Event.create({}));

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    msg: "Event was created!"
  });
};
