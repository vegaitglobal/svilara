const models = require("../models");
const Random = require("random-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { to, ReS, ReE } = require("../helpers/utils");

let mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

let random = new Random(Random.engines.mt19937().autoSeed());

// LOGIN ADMIN
exports.loginAdmin = async function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) return ReE(res, "Invalid Params!");

  let [err, dbAdmin] = await to(
    models.Admin.findOne({
      where: {
        email: email
      }
    })
  );

  if (err) return err, err.message;

  if (dbAdmin == null) {
    return ReE(res, "Wrong email or password!");
  }

  let result = await to(bcrypt.compare(password, dbAdmin.password));

  if (result) {
    let token = jwt.sign(
      {
        id: dbAdmin.id
      },
      process.env.ADMIN_SECRET
    );
    return ReS(res, {
      msg: "You have been successfully logged in",
      token: token
    });
  } else return ReE(res, "Wrong email or password!");
};

//SEND-RESEND EMAIL
/*
exports.sendEmail = function (req, res) {
    let email = req.body.email
    let type = req.body.type

    models.Account.findOne({
        attributes: ['id', 'email', 'phone', 'verHash', 'verCode', 'resetCode', 'emailVer'],
        where: {
            'email': email
        }
    }).then(function (dbUser) {
        if (dbUser == null) return res.json({
            "status": "error",
            "msg": "Email not exist!"
        });
        if (type == "emailVerification") {
            if (dbUser.emailVer == 'Y') return res.json({
                "status": "error",
                "msg": "Email already verified!"
            });
            let verHash = dbUser.verHash
            let data = {
                from: 'InvestorMatchBook <verify@investormatchbook.com>',
                to: email,
                subject: 'Verify Email',
                text: 'Verification link: http://api.investormatchbook.com/v1/auth/email/verify?k=' + verHash
            };

            mailgun.messages().send(data, function (error, body) {
                if (error) return console.log(error)
                console.log(body);
                res.json({
                    status: "ok",
                    msg: "Please check your email inbox!"
                })
            });
        }
        if (type == "resetCode") {
            let code = dbUser.resetCode
            let data = {
                from: 'InvestorMatchBook <verify@investormatchbook.com>',
                to: email,
                subject: 'Password Reset',
                text: 'Password reset code: ' + code
            };
            mailgun.messages().send(data, function (error, body) {
                if (error) return console.log(error)
                console.log(body);
                res.json({
                    status: "ok",
                    msg: "Please check your email inbox!"
                })
            });
        }
    })
}
*/

exports.resetUser = async function(req, res) {
  let email = req.body.email;
  let code = req.body.code;
  let password = req.body.password;
  let newResetCode = random.integer(10000000, 99999999);

  if (!email || !password || !code) return ReE(res, "Invalid Params!");

  let [err, dbUser] = await to(
    models.Admin.findOne({
      attributes: ["id", "email", "resetCode"],
      where: {
        email: email
      }
    })
  );

  if (err) return ReE(res, err.message);

  if (dbUser == null) return ReE(res, "Email not exist!");

  if (code != dbUser.resetCode) return ReE(res, "Wrong code!");

  let hash = bcrypt.hashSync(password, 10);

  let [err2, updateResult] = await to(
    models.Users.update(
      {
        password: hash,
        resetCode: newResetCode
      },
      {
        where: {
          email: email
        }
      }
    )
  );

  if (err2) return ReE(res, err2.message);

  return ReS(res, {
    msg: "Password was changed!"
  });
};
