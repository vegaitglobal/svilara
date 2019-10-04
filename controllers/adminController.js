const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");

// GET EVENTS
exports.getEvents = async function(req, res) {
  let [err, dbEvents] = await to(models.Event.findAll({}));

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    data: dbEvents
  });
};

// CREATE EVENT
exports.createEvent = async function(req, res) {
  let title = req.body.title;
  let location = req.body.location;
  let description = req.body.description;
  let formData = null;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let category = req.body.category;
  let space = req.body.space;
  let socialMedia = req.body.socialMedia;
  let media = req.body.media;
  let age = req.body.age;
  let [err, dbCreated] = await to(
    models.Event.create({
      title,
      location,
      description,
      startTime,
      endTime,
      category,
      space,
      socialMedia,
      media,
      age
    })
  );

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    msg: "Event was created!"
  });
};

// EDIT EVENT
exports.updateEvent = async function(req, res) {
  let eventID = req.params.eventID;
  let title = req.body.title;
  let location = req.body.location;
  let description = req.body.description;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let category = req.body.category;
  let space = req.body.space;
  let socialMedia = req.body.socialMedia;
  let media = req.body.media;
  let age = req.body.age;
  let [err, dbUpdated] = await to(
    models.Event.update(
      {
        title,
        location,
        description,
        startTime,
        endTime,
        category,
        space,
        socialMedia,
        media,
        age
      },
      { where: { id: eventID } }
    )
  );

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    msg: "Event was updated!"
  });
};

// DELETE EVENT
exports.deleteEvent = async function(req, res) {
  let eventID = req.params.eventID;
  let [err, dbDeleted] = await to(
    models.Event.destroy({ where: { id: eventID } })
  );

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    msg: "Event was deleted!"
  });
};
