var fs = require("fs");
const models = require("../models");
const { to, ReS, ReE } = require("../helpers/utils");
var formidable = require("formidable");
const Random = require("random-js").Random;
var mv = require('mv');
const random = new Random();
// GET EVENTS
exports.getEvents = async function(req, res) {
  let [err, dbDevices] = await to(
    models.Event.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "picture",
        "status",
        "category",
        "type",
        "space",
        "price",
        "age",
        "startTime",
        "endTime"
      ],
      where: { status: "accepted" }
    })
  );

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
      return ReE(res, { message: "Došlo je do greške, probajte ponovo!" }, 400);
    }
    var email = fields.email;
    var formAnswers = JSON.parse(fields.formAnswers);

    let [err1, questions] = await to(models.Question.findAll({
      where: {mandatory: 1}
    }));

    if (err1) {
      return ReE(res, { message: "Došlo je do greške, probajte ponovo!" }, 500);
    }

    if (formAnswers.length < questions.length){
      return ReE(res, {message: "Niste popunili sva obavezna pitanja"}, 400);
    }
    
    for (prop in files) {
      
      if (files[prop].type !== "image/jpeg" && files[prop].type !== "image/png") {
        return ReE(res, { message: "Pogrešan format slike!" }, 415);
      } else {
        // set image extenstion and new path (old path is in /tmp)
        var logoTmpPath = files[prop].path;
        var fileName2 = random.string("24");
        if (files[prop].type == "image/jpeg") var imgExt2 = ".jpg";
        if (files[prop].type == "image/png") var imgExt2 = ".png";
        var logoName = fileName2 + imgExt2;
        var newLogoPath = "./public/uploads/" + logoName;
      }
      mv(logoTmpPath, newLogoPath, function(err) {
        if (err) return ReE(res, { message: "Logo nije uspešno upisan!" }, 415);
      });
      for (let i= 0; i < formAnswers.length; i++){
       
        if (formAnswers[i].type == 'file'){
          if (formAnswers[i].name == files[prop].name){
            formAnswers[i].answers = logoName;
          }
        }
      }
    }
    let formAnswersString = JSON.stringify(formAnswers)
    let [err, dbCreated] = await to(
      models.Event.create({
        formAnswers: formAnswersString,
        // picture: imageName,
        // logo: logoName,
        contactEmail: email
      })
    );

    if (err) {
      console.log(err);
      return ReE(res, { message: "Došlo je do greške!" }, 500);
    }

    return ReS(res, {
      msg: "Događaj je kreiran!"
    });
  });
};

exports.getEventPage = async function(req, res) {
  let [err1, dbEventPage] = await to(
    models.Event.findOne({
      attributes: ["html"],
      where: {
        id: req.params.id,
        status: "accepted"
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
