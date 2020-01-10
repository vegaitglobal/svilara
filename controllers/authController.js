const models = require("../models");
const Random = require("random-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { to, ReS, ReE } = require("../helpers/utils");

let mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

//let random = new Random(Random.engines.mt19937().autoSeed());

// LOGIN ADMIN
exports.loginAdmin = async function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  // console.log('email: '+  email);
  // console.log("password: " + password);
  //console.log('========================================')
  // let myPassword = 'bilja';
  // bcrypt.genSalt(4, function (err, salt) {
  //   bcrypt.hash(myPassword, salt, function (err, hash) {
  //     console.log("hash:   " + hash);
  //   });
  // });

  if (!email || !password) {
    return ReE(res, "Nevalidni parametri!", 400);
  }

  let [err, dbAdmin] = await to(
    models.Admin.findOne({
      where: {
        email: email
      }
    })
  );

  if (err) return ReE(res, "Nešto nije u redu!", 400);

  if (dbAdmin == null) {
    return ReE(res, "Korisnik sa datim mejlom ne postoji!", 400);
  }

  let [err2, result] = await to(bcrypt.compare(password, dbAdmin.password));

  if (err2) return ReE(res, "Nešto nije u redu!", 400);

  if (result) {
    let token = jwt.sign(
      {
        id: dbAdmin.id
      },
      process.env.ADMIN_SECRET,
      { expiresIn: 14400 }
    );
    return ReS(res, {
      msg: "Uspešno ste se ulogovali.",
      token: token,
      user: dbAdmin
    });
  } else return ReE(res, "Pogrešan mejl ili šifra!", 400);
};

exports.forgotPassword = async function(req, res) {
  let email = req.body.email;
  let referer = req.headers.referer;

  if (!email) {
    return ReE(res, "Nevalidni parametri!", 400);
  }

  let [err, dbAdmin] = await to(
    models.Admin.findOne({
      where: {
        email: email
      }
    })
  );

  if (err) return err, err.message;

  if (dbAdmin == null) {
    return ReE(res, "Ne postoji korisnik sa tim mejlom!", 404);
  } else {
    let secret = dbAdmin.password + "-" + dbAdmin.created;
    let token = jwt.sign(
      {
        id: dbAdmin.id
      },
      secret,
      { expiresIn: 3600 }
    );
    email = process.env.TEST_MAIL || email;
    let resetUrl = `${referer}#/admin/reset-password/${dbAdmin.id}/${token}`;

    let mailData = {
      from: `${dbAdmin.nameFrom} <${dbAdmin.emailFrom}>`,
      to: email,
      subject: "Zaboravljena šifra",
      text: `Stigao Vam je ovaj mejl jer ste tražili promenu šifre za Vaš nalog.\nKliknite na sledeći link da završite proces: 
      \n${resetUrl}\n\nUkoliko niste Vi ti koji zahtevate promenu šifre, ignorišite ovaj mejl i šifra će ostati nepromenjena.`
    };

    mailgun.messages().send(mailData, function(error, body) {
      if (error) return ReE(res, "Greška u slanju mejla!", 502);

      return ReS(res, {
        msg: "Mail with link sent successfully."
      });
    });
  }
};

exports.changeForgotPassword = async function(req, res) {
  const { userId, token } = req.params;
  const { password, password_confirmation } = req.body;

  if (!password || !password_confirmation) {
    return ReE(res, "Nevalidni parametri!", 400);
  }
  if (password !== password_confirmation) {
    return ReE(res, "Šifra i potvrdna šifra nisu iste!", 400);
  }

  let [err, dbAdmin] = await to(
    models.Admin.findOne({
      where: {
        id: userId
      }
    })
  );

  if (err) return err, err.message;

  if (dbAdmin == null) {
    return ReE(res, "Korisnik ne postoji!", 404);
  } else {
    const secret = dbAdmin.password + "-" + dbAdmin.created;
    let err1;
    
    if (token) {
      jwt.verify(token, secret, (err, authData) => {
        if (err) {
          err1 = err;
        }
      });
      if (err1) return ReE(res, "Nije vam dozvoljeno da menjate šifru!", 400);
    } else {
      return ReE(res, "Nije vam dozvoljeno da menjate šifru!", 400);
    }

    const payload = jwt.decode(token, secret);
    if (payload && payload.id && payload.id === dbAdmin.id) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) return ReE(res, err.message, 500);
          models.Admin.update(
            {
              password: hash
            },
            {
              where: {
                id: payload.id
              }
            }
          )
            .then(() => ReS(res, { msg: "Password was changed!" }))
            .catch(err2 => ReE(res, err2.message, 500));
        });
      });
    } else return ReE(res, "Nije Vam dozvoljeno da promenite šifru!", 400);
  }
};
exports.createAdmin = async function(req, res) {
  const { password, email, emailFrom, nameFrom } = req.body;
  if (!password || !email || !emailFrom || !nameFrom) {
    return ReE(res, "Nevalidni parametri!", 400);
  }

  let [err, dbAdmin] = await to(
    models.Admin.findOne({
      where: {
        email: email
      }
    })
  );

  if (err) return ReE(res, "Nešto nije u redu!", 400);

  if (dbAdmin !== null) {
    return ReE(res, "Korisnik sa datim mejlom već postoji!", 400);
  }

  let [err1, dbCreated] = await to(
    models.Admin.create({
      password,
      email,
      type : "admin",
      emailFrom, 
      nameFrom
    })
  );
  if (err1) {
    console.log(err1);
    return ReE(res, { message: "Nešto nije u redu, probajte ponovo!" }, 500);
  }
  return ReS(res, {
    data: dbCreated,
    msg: "Uspešno registrovan admin."
  });
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

/*
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
*/
