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
exports.loginAdmin = async function (req, res) {
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
    return ReE(res, "Invalid Params!", 400);
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
    return ReE(res, "Wrong email or password!", 400);
  }


  let [err2, result] = await to(bcrypt.compare(password, dbAdmin.password));

  if (err2) return err, err.message;

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
  } else return ReE(res, "Wrong email or password!", 400);
};



exports.forgotPassword = async function (req, res) {
  let email = req.body.email;

  console.log(email);

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

    email = 'lukicbiljana54@gmail.com'; // to delete after
    let resetUrl = `http://localhost:8080/#/admin/reset-password/${dbAdmin.id}/${token}`;
  
    let mailData = {
      from: "Svilara <svilara@test.com>",
      to: email,
      subject: "Zaboravljena sifra",
      text: `Stigao Vam je ovaj email jer ste trazili promenu sifre za Vas nalog.\nKliknite na sledeci link da zavrsite proces: 
      \n${resetUrl}\n
      Ukoliko niste Vi ti koji zahtevate promenu sifre, ignorisite ovaj mail i sifra ce ostati nepromenjena.`,
      // html: `<p>Stigao Vam je ovaj email jer ste trazili promenu sifre za Vas nalog.</p>
      // <p>Kliknite na sledeci link da zavrsite proces: </p>
      // <a>${resetUrl}</a><p>Ukoliko niste Vi ti koji zahtevate promenu sifre, ignorisite ovaj mail i sifra ce ostati nepromenjena.</p>`
    };
    console.log(JSON.stringify(email))

    mailgun.messages().send(mailData, function (error, body) {
      if (error) return console.log(error);
      console.log(body);
      return ReS(res, {
        msg: "Mail with link sent successfully."
      });
    });

  }
}

exports.changeForgotPassword = async function (req, res) {
  console.log(JSON.stringify(req.params));
  const { userId, token } = req.params;
  const { password, password_confirmation } = req.body;

  if (password !== password_confirmation){
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
    return ReE(res, "Ne možemo da nađemo tog korisnika!", 404);
  } else {

      const secret = dbAdmin.password + "-" + dbAdmin.createdAt;
      const payload = jwt.decode(token, secret);

       if (payload && payload.id && payload.id === dbAdmin.id) {
         bcrypt.genSalt(10, function (err, salt) {
           bcrypt.hash(password, salt, function (err, hash) {
             if (err) return err, err.message;

               models.Admin.update(
                {
                  password: hash,
                },
                {
                  where: {
                    id: payload.id
                  }
                }
               ).then (() => ReS(res, { msg: "Password was changed!" }))
             .catch (err2 => err2)
          });
         });
       } else return ReE(res, "Nije Vam dozvoljeno da promenite šifru!", 400);
  }
}

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
