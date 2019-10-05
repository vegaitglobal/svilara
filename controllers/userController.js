const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

// GET EVENTS
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

// CREATE EVENTS
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

exports.getEventPage = async function(req, res) {
  let [err1, dbEventPage] = await to(
    models.Event.findOne({
      attributes: ["html"],
      where: {
        id: req.params.id
      }
    })
  );
  if (err1) {
    console.log(err);
    return ReE(res, err.message);
  }
  return ReS(res, {
    data: dbEventPage
  });
};
