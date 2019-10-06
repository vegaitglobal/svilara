const validator = require("validator");

var fs = require("fs");
const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");
var formidable = require("formidable");
const Random = require("random-js").Random;
const random = new Random();

var mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

// GET EVENTS
exports.getEvents = async function(req, res) {
  let [err, dbEvents] = await to(
    models.Event.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "logo",
        "picture",
        "status",
        "category",
        "type",
        "space",
        "price",
        "socialMedia",
        "age",
        "contactEmail",
        "formAnswers",
        "startTime",
        "endTime",
        "created"
      ]
    })
  );

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
  var form = new formidable.IncomingForm();
  form.parse(req, async function(error, fields, files) {
    if (error) {
      console.log(error);
      return ReE(res, { msg: "Something went wrong!" });
    }
    let title = fields.title;
    let description = fields.description;
    let startTime = fields.startTime;
    let endTime = fields.endTime;
    let category = fields.category;
    let space = fields.space;
    let type = fields.type;
    let price = fields.price;
    let socialMedia = fields.socialMedia;
    let age = fields.age;

    let validatorMessage = validateEvent(fields);
    if (validatorMessage) {
      return ReE(res, {
        msg: validatorMessage
      });
    }

    if (files.picture) {
      // check mime type (is image)
      if (
        files.picture.type !== "image/jpeg" &&
        files.picture.type !== "image/png"
      ) {
        return ReE(res, { msg: "Wrong image format!" });
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var imageTmpPath = files.picture.path;
        var fileName = random.string("24");
        if (files.picture.type == "image/jpeg") var imgExt = ".jpg";
        if (files.picture.type == "image/png") var imgExt = ".png";
        var imageName = fileName + imgExt;
        var newImagePath = "./public/uploads/" + imageName;
      }
      fs.renameSync(imageTmpPath, newImagePath);
    } else imageName = "default-picture.png";

    if (files.logo) {
      // check mime type (is image)
      if (files.logo.type !== "image/jpeg" && files.logo.type !== "image/png") {
        return ReE(res, { msg: "Wrong image format!" });
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var logoTmpPath = files.logo.path;
        var fileName2 = random.string("24");
        if (files.logo.type == "image/jpeg") var imgExt2 = ".jpg";
        if (files.logo.type == "image/png") var imgExt2 = ".png";
        var logoName = fileName2 + imgExt2;
        var newLogoPath = "./public/uploads/" + logoName;
      }
      fs.renameSync(logoTmpPath, newLogoPath);
    } else logoName = "default-picture.png";

    let [err, dbCreated] = await to(
      models.Event.create({
        title,
        description,
        picture: imageName,
        logo: logoName,
        startTime,
        endTime,
        category,
        type,
        price,
        space,
        socialMedia,
        age,
        status: "accepted"
      })
    );

    if (err) {
      console.log(err);
      return ReE(res, err.message);
    }

    return ReS(res, {
      data: dbCreated,
      msg: "Event was created!"
    });
  });
};

// UPDATE EVENT
exports.updateEvent = async function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, async function(error, fields, files) {
    if (error) {
      console.log(error);
      return ReE(res, { msg: "Something went wrong!" });
    }
    let title = fields.title;
    let description = fields.description;
    let startTime = fields.startTime;
    let endTime = fields.endTime;
    let category = fields.category;
    let space = fields.space;
    let type = fields.type;
    let price = fields.price;
    let socialMedia = fields.socialMedia;
    let age = fields.age;

    let validatorMessage = validateEvent(req.body);
    console.log(validatorMessage);
    if (validatorMessage) {
      return ReE(res, {
        msg: validatorMessage
      });
    }

    console.log("dodje");
    if (files.picture) {
      // check mime type (is image)
      if (
        files.picture.type !== "image/jpeg" &&
        files.picture.type !== "image/png"
      ) {
        return ReE(res, { msg: "Wrong image format!" });
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var imageTmpPath = files.picture.path;
        var fileName = random.string("24");
        if (files.picture.type == "image/jpeg") var imgExt = ".jpg";
        if (files.picture.type == "image/png") var imgExt = ".png";
        var imageName = fileName + imgExt;
        var newImagePath = "./public/uploads/" + imageName;
      }
      fs.renameSync(imageTmpPath, newImagePath);
    } else imageName = "default-picture.png";

    if (files.logo) {
      // check mime type (is image)
      if (files.logo.type !== "image/jpeg" && files.logo.type !== "image/png") {
        return ReE(res, { msg: "Wrong image format!" });
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var logoTmpPath = files.logo.path;
        var fileName2 = random.string("24");
        if (files.logo.type == "image/jpeg") var imgExt2 = ".jpg";
        if (files.logo.type == "image/png") var imgExt2 = ".png";
        var logoName = fileName2 + imgExt2;
        var newLogoPath = "./public/uploads/" + logoName;
      }
      fs.renameSync(logoTmpPath, newLogoPath);
    } else logoName = "default-picture.png";

    let [err, dbUpdated] = await to(
      models.Event.update(
        {
          title,
          description,
          startTime,
          endTime,
          category,
          type,
          price,
          space,
          socialMedia,
          age,
          logo: logoName,
          picture: imageName
        },
        { where: { id: req.params.id } }
      )
    );

    if (err) {
      console.log(err);
      return ReE(res, err.message);
    }

    return ReS(res, {
      msg: "Event was updated!"
    });
  });
};

exports.updateEventPicture = async function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, async function(error, fields, files) {
    if (error) {
      console.log(error);
      return ReE(res, { msg: "Something went wrong!" });
    }

    if (files.picture) {
      if (
        files.picture.type !== "image/jpeg" &&
        files.picture.type !== "image/png"
      ) {
        return res.json({ status: "error", msg: "Wrong image format!" });
      } else {
        let [err1, dbEvent] = await to(
          models.Event.findOne({
            attributes: ["id", "picture"],
            where: {
              id: req.params.id
            }
          })
        );
        if (err1) {
          console.log(err);
          return ReE(res, err.message);
        }
        var imageTmpPath = files.picture.path;
        if (dbEvent.picture == "default-picture.png")
          var fileName = random.string("24");
        else {
          fs.unlinkSync("./public/uploads/" + dbEvent.picture); //remove old picture
          var fileName = random.string("24");
        }
        if (files.picture.type == "image/jpeg") var imgExt = ".jpg";
        if (files.picture.type == "image/png") var imgExt = ".png";
        var imageName = fileName + imgExt;
        var newImagePath = "./public/uploads/" + imageName;
        fs.renameSync(imageTmpPath, newImagePath);
        let [err2, dbUpdated] = await to(
          dbEvent.update({ picture: imageName })
        );
        if (err2) {
          console.log(err);
          return ReE(res, err.message);
        }

        return ReS(res, {
          data: dbUpdated,
          msg: "Picture was updated!"
        });
      }
    }
  });
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  let [err, dbDeleted] = await to(
    models.Event.destroy({
      where: {
        id: req.params.id
      }
    })
  );
  if (err) {
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    msg: "Deleted successfully."
  });
};

// ACCEPT EVENT
exports.acceptEvent = async (req, res) => {
  let explanation = req.body.explanation;
  //let email = req.body.email;
  let email = "zeka035@gmail.com";
  let [err, dbUpdated] = await to(
    models.Event.update(
      { status: "accepted" },
      {
        where: {
          id: req.params.id
        }
      }
    )
  );
  if (err) {
    return ReE(res, {
      msg: "Something went wrong"
    });
  }

  let mailData = {
    from: "Svilara <svilara@test.com>",
    to: email,
    subject: "Zahtev Prihvacen",
    text: explanation
  };

  mailgun.messages().send(mailData, function(error, body) {
    if (error) return console.log(error);
    console.log(body);
    return ReS(res, {
      msg: "Accepted successfully."
    });
  });
};

// REJECT EVENT
exports.rejectEvent = async (req, res) => {
  let explanation = req.body.explanation;
  let email = "zeka035@gmail.com";
  let [err, dbUpdated] = await to(
    models.Event.update(
      { status: "rejected" },
      {
        where: {
          id: req.params.id
        }
      }
    )
  );
  if (err) {
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  let mailData = {
    from: "Svilara <svilara@test.com>",
    to: email,
    subject: "Zahtev Odbijen",
    text: explanation
  };

  mailgun.messages().send(mailData, function(error, body) {
    if (error) return console.log(error);
    console.log(body);
    return ReS(res, {
      msg: "Rejected successfully."
    });
  });
};

// UPDATE EVENT PAGE
exports.updateEventPage = async (req, res) => {
  console.log(req.params.id);
  let data = req.body.pageData;
  console.log(data);
  let [err, dbUpdated] = await to(
    models.Event.update(
      {
        html: data
      },
      { where: { id: req.params.id } }
    )
  );
  if (err) {
    console.log(err);
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    //data: dbUpdated,
    msg: "Update  was successfull."
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

// GET QUESTIONS
exports.getQuestions = async function(req, res) {
  let [err, dbQuestions] = await to(models.Question.findAll({}));

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }

  return ReS(res, {
    data: dbQuestions
  });
};

// CREATE QUESTIONS
exports.createQuestion = async (req, res) => {
  let text = req.body.text;
  let fieldType = req.body.fieldType;
  let order = req.body.order;
  let mandatory = req.body.mandatory;
  let values = null;

  let validatorMessage = validateQuestion(req.body);
  if (validatorMessage) {
    return ReE(res, {
      msg: validatorMessage
    });
  }

  if (req.body.values) values = req.body.values;

  let [err, dbCreated] = await to(
    models.Question.create({
      text,
      fieldType,
      values,
      order,
      mandatory
    })
  );

  if (err) {
    console.log(err);
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    data: dbCreated,
    msg: "Create was successfull."
  });
};

// UPDATE QUESTIONS
exports.updateQuestion = async (req, res) => {
  let text = req.body.text;
  let fieldType = req.body.fieldType;
  let order = req.body.order;
  let mandatory = req.body.mandatory;
  let values = req.body.values;

  let validatorMessage = validateQuestion(req.body);
  if (validatorMessage) {
    return ReE(res, {
      msg: validatorMessage
    });
  }

  if (req.body.values) values = req.body.values;

  let allowedFiledTypes = ["input", "checkbox", "radiobutton", "file"];
  if (!allowedFiledTypes.includes(fieldType))
    return ReE(res, {
      msg: "Wrong Params!."
    });

  let [err, dbUpdated] = await to(
    models.Question.update(
      {
        text,
        fieldType,
        order,
        mandatory,
        values
      },
      { where: { id: req.params.id } }
    )
  );
  if (err) {
    console.log(err);
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    msg: "Update  was successfull."
  });
};

// DELETE QUESTIONS
exports.deleteQuestion = async (req, res) => {
  let [err, dbDeleted] = await to(
    models.Question.destroy({
      where: {
        id: req.params.id
      }
    })
  );
  if (err) {
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    msg: "Deleted was successfully."
  });
};

// GET SETTINGS
exports.getSettings = async (req, res) => {
  let [err, dbSettings] = await to(models.Settings.findAll());
  if (err) {
    console.log(err);
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    data: dbSettings
  });
};

// CREATE SETTINGS
exports.createSettings = async (req, res) => {
  let [err, dbSettings] = await to(
    models.Settings.create({
      key: req.body.key,
      value: req.body.value
    })
  );
  if (err) {
    console.log(err);
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    msg: "Successfully created",
    data: dbSettings
  });
};

// UPDATE SETTINGS
exports.updateSettings = async (req, res) => {
  let [err, dbUpdated] = await to(
    models.Settings.update(
      {
        key: req.body.key,
        value: req.body.value
      },
      { where: { id: req.params.id } }
    )
  );
  if (err) {
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    msg: "Update successfull."
  });
};

// DELETE SETTINGS
exports.deleteSettings = async (req, res) => {
  let [err, dbDeleted] = await to(
    models.Settings.destroy({
      where: {
        id: req.params.id
      }
    })
  );
  if (err) {
    return ReE(res, {
      msg: "Something went wrong"
    });
  }
  return ReS(res, {
    msg: "Deleted successfully."
  });
};

function validateQuestion(body) {
  let allowedFiledTypes = ["input", "checkbox", "radiobutton", "file"];
  if (!allowedFiledTypes.includes(body.fieldType)) {
    return body.fieldType + " is not allowed as fieldtype";
  }
  // if (!validator.isBoolean(body.mandatory)) {
  //   return "mandatory must be boolean";
  // }
  // if (!validator.isNumeric(body.order) || body.order < 0) {
  //   return "order must be positive integer";
  // }
  // if (!validator.isJSON(body.values)) {
  //   // TODO extra code to check is body.values json string array
  //   return "values must be JSON string array";
  // }
  // if (body.id && !validator.isNumeric(body.id)) {
  //   return "Id must be numeric";
  // }

  return undefined;
}

function validateEvent(body) {
  if (!body.title || validator.isEmpty(body.title)) {
    return "Title is required";
  }

  // QUESTION: is picture required?
  /*if (!body.picture || validator.isEmpty(body.picture))
  {
    return "Picture is required"
  }*/

  if (!body.category || validator.isEmpty(body.category)) {
    return "Category is required";
  }

  if (!body.type || validator.isEmpty(body.type)) {
    return "Type is required";
  }

  if (!body.space || validator.isEmpty(body.space)) {
    return "Space is required";
  }

  if (!body.age || validator.isEmpty(body.age)) {
    return "Age is required";
  }

  // startTime and  endTime validation
  if (body.startTime && !validator.isISO8601(body.startTime)) {
    return "startTime is not valid ISO-8601 date";
  }

  if (body.endTime && !validator.isISO8601(body.endTime)) {
    return "endTime is not valid ISO-8601 date";
  }

  if (
    body.startTime &&
    body.endTime &&
    validator.isBefore(body.endTime, body.startTime)
  ) {
    return "endTime is before the startTime";
  }
}
