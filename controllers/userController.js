var fs = require("fs");
const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");
var formidable = require("formidable");
const Random = require("random-js").Random;
const random = new Random();
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
  var form = new formidable.IncomingForm();
  form.parse(req, async function(error, fields, files) {
    if (error) {
      return ReE(res, { msg: "Something went wrong!" });
    }
    var email = fields.email;
    var formAnswers = fields.formAnswers;
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
      console.log("ima logo");
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
    } else {
      logoName = "default-picture.png";
    }

    let [err, dbCreated] = await to(
      models.Event.create({
        formAnswers: formAnswers,
        picture: imageName,
        logo: logoName,
        contactEmail: email
      })
    );

    if (err) {
      console.log(err);
      return ReE(res, err.message);
    }

    return ReS(res, {
      msg: "Event was created!"
    });
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
