const validator = require("validator");

var fs = require("fs");
const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");
var formidable = require("formidable");
var mv = require("mv");
let Sequelize = require("sequelize");

const Random = require("random-js").Random;
const random = new Random();

const Op = Sequelize.Op;

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

exports.getEventsTable = async function(req, res) {
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
      ],
      where:{
        [Op.or]: [{status: 'pending'}, {status: 'rejected', created:{[Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)}}, 
        {status: 'accepted', endTime:{[Op.gt]: new Date()}}]
      }
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
      return ReE(res, { msg: "Došlo je do greške!" }, 400);
    }
    console.log(JSON.stringify(fields))
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

    let validatorMessage = validateEvent(fields, files);
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
      mv(imageTmpPath, newImagePath, function(err) {
        if (err) return ReE(res, { msg: "Slika nije uspešno upisana!" }, 400);
      });
      //fs.renameSync(imageTmpPath, newImagePath);
    } else imageName = "default-picture.png";

    if (files.logo) {
      // check mime type (is image)
      if (files.logo.type !== "image/jpeg" && files.logo.type !== "image/png") {
        return ReE(res, { msg: "Pogrešan format logoa!" }, 400);
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var logoTmpPath = files.logo.path;
        var fileName2 = random.string("24");
        if (files.logo.type == "image/jpeg") var imgExt2 = ".jpg";
        if (files.logo.type == "image/png") var imgExt2 = ".png";
        var logoName = fileName2 + imgExt2;
        var newLogoPath = "./public/uploads/" + logoName;
      }
      mv(logoTmpPath, newLogoPath, function(err) {
        if (err) return ReE(res, { msg: "Logo nije uspešno upisan!" }, 400);
      });
      //fs.renameSync(logoTmpPath, newLogoPath);
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
      return ReE(res, "Došlo je do greške!", 400);
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
      return ReE(res, { msg: "Something went wrong!" }, 400);
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

    let logoName = "";
    let imageName = "";

    // let validatorMessage = validateEvent(fields, files);
    // console.log(validatorMessage);
    // if (validatorMessage) {
    //   return ReE(res, {
    //     msg: validatorMessage
    //   });
    // }

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
        imageName = fileName + imgExt;
        var newImagePath = "./public/uploads/" + imageName;
      }
      mv(imageTmpPath, newImagePath, function(err) {
        if (err) return ReE(res, { msg: "Slika nije uspešno upisana!" }, 400);
      });
      //fs.renameSync(imageTmpPath, newImagePath);
    } else imageName = fields.picture;

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
       logoName = fileName2 + imgExt2;
        var newLogoPath = "./public/uploads/" + logoName;
      }
      mv(logoTmpPath, newLogoPath, function(err) {
        if (err) return ReE(res, { msg: "Logo nije uspešno upisan!" }, 400);
      });
      //fs.renameSync(logoTmpPath, newLogoPath);
    } else logoName = fields.logo;

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
      return ReE(res, err.message, 400);
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
  //let explanation = req.body.explanation;
  //let email = req.body.email;
  let email = "lukicbiljana54@gmail.com";
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
    return ReE(res, "Zahtev nije uspešno prihvaćen.", 400);
  }

  if (dbUpdated[0] === 0) {
    return ReE(res, "Zahtev nije pronađen.", 404);
  }

  let mailData = {
    from: "Svilara <svilara@test.com>",
    to: email,
    subject: "Zahtev Prihvaćen",
    text: "Vas zahtev je prihvaćen."
    //text: explanation
  };

  mailgun.messages().send(mailData, function(error, body) {
    if (error) return ReE(res, "Mail nije uspešno poslat.", 400);
    console.log(body);
    return ReS(res, {
      msg: "Uspešno prihvaćeno."
    });
  });
};

// REJECT EVENT
exports.rejectEvent = async (req, res) => {
  let explanation = req.body.explanation;

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
    return ReE(res, "Zahtev nije uspešno odbijen.", 400);
  }

  if (dbUpdated[0] === 0) {
    return ReE(res, "Zahtev nije pronađen.", 404);
  }

  let email = "lukicbiljana54@gmail.com"; // ovde ce biti mail od svilare kao podsetnik da posalju obrazlozenje za odbijanje
  let mailData = {
    from: "Svilara <svilara@test.com>",
    to: email,
    subject: "Zahtev Odbijen",
    text: "Vas zahtev je odbijen"
  };

  mailgun.messages().send(mailData, function(error, body) {
    if (error)
      return ReE(res, "Podsetnik nije uspešno poslat na mail adresu.", 400);
    console.log(body);
    return ReS(res, {
      msg: "Uspešno odbijeno."
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
  let name = req.body.name;

  // let validatorMessage = validateQuestion(req.body);
  // if (validatorMessage) {
  //   return ReE(res, {
  //     msg: validatorMessage
  //   });
  // }

  if (req.body.values) values = req.body.values;

  let [err, dbCreated] = await to(
    models.Question.create({
      text,
      fieldType,
      values,
      order,
      mandatory, 
      name
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
  console.log('usao u update ======')
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
  console.log(JSON.stringify(req.body))
  let [err, dbSettings] = await to(
    models.Settings.create({
      key: req.body.key,
      value: req.body.value,
      sidebar: req.body.sidebar,
      keyShown: req.body.keyShown
    })
  );
  console.log(JSON.stringify(dbSettings))
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
  var form = new formidable.IncomingForm();
  form.parse(req, async function(error, fields, files) {
    if (error) {
      console.log(error);
      return ReE(res, { msg: "Došlo je do greške!" }, 400);
    }
    let key = fields.key;
    let value = "";
    if (files.value) {
      if (
        files.value.type !== "image/jpeg" &&
        files.value.type !== "image/png"
      ) {
        return ReE(res, { msg: "Pogrešan format slike!" });
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var imageTmpPath = files.value.path;
        var fileName = random.string("24");
        if (files.value.type == "image/jpeg") var imgExt = ".jpg";
        if (files.value.type == "image/png") var imgExt = ".png";
        var imageName = fileName + imgExt;
        value = imageName;
        var newImagePath = "./public/uploads/" + imageName;
      }
      mv(imageTmpPath, newImagePath, function(err) {
        if (err) return ReE(res, { msg: "Slika nije uspešno upisana!" }, 400);
      });
  } else if (key == 'glavni logo' || key == 'sporedni logo 1' || key == 'sporedni logo 2'){
      value = "";
  }
  else {
    value = fields.value;
  }
   
    let [err, dbUpdated] = await to(
      models.Settings.update(
        {
          key,
          value
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
      data: dbUpdated
    });
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

exports.getScripts = async function(req, res) {
  let [err, dbScripts] = await to(models.Script.findAll({}));

  if (err) {
    console.log(err);
    return ReE(res, err.message);
  }
console.log(dbScripts);
  return ReS(res, {
    data: dbScripts
  });
};

exports.createScript = async (req, res) => {
  let [err, dbScript] = await to(
    models.Script.create({
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
    data: dbScript
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

function validateEvent(body, files) {
  if (!body.title || validator.isEmpty(body.title)) {
    
    return "Unesite naslov programa";
  }
  
  if (!files.picture)
  {
    return "Unesite sliku"
  }

  if (!files.logo)
  {
    return "Unesite logo"
  }


  if (!body.description || validator.isEmpty(body.description)) {
    return "Unesite opis programa";
  }

  if (!body.category || validator.isEmpty(body.category)) {
    return "Unesite kategoriju programa";
  }

  if (!body.type || validator.isEmpty(body.type)) {
    return "Unesite tip programa";
  }

  if (!body.socialMedia || validator.isEmpty(body.socialMedia)) {
    return "Unesite link";
  }

  if (!body.space || validator.isEmpty(body.space)) {
    return "Unesite planirani prostor za program";
  }

  if (!body.age || validator.isEmpty(body.age)) {
    return "Unesite uzrast publike";
  }
  if (!body.startTime || validator.isEmpty(body.startTime)) {
    return "Unesite datum i vreme početka";
  }
  // startTime and  endTime validation
  if (body.startTime && !validator.isISO8601(body.startTime)) {
    return "Datum ili vreme početka nisu validni";
  }
  if (!body.endTime || validator.isEmpty(body.endTime)) {
    return "Unesite datum i vreme kraja programa";
  }
  if (body.endTime && !validator.isISO8601(body.endTime)) {
    return "Datum ili vreme kraja programa nisu validni";
  }

  if (
    body.startTime &&
    body.endTime &&
    validator.isBefore(body.endTime, body.startTime)
  ) {
    return "Vreme kraja programa je pre vremena početka programa";
  }
}
