const { to } = require("await-to-js");
const pe = require("parse-error");

module.exports.to = async promise => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [pe(err)];
  return [null, res];
};

module.exports.ReE = function(res, err, code = null, log = false) {
  // Error Web Response
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }
  if (log === true) console.log(err);

  if (code !== null) res.statusCode = code;
  return res.json({ success: false, error: err });
};

module.exports.ReS = function(res, data, code = null, log = false) {
  // Success Web Response
  let send_data = { success: true };

  if (typeof data == "object") {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (log === true) console.log(send_data);

  if (code !== null) res.statusCode = code;
  return res.json(send_data);
};

module.exports.TE = function(err_message, log) {
  // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }

  throw new Error(err_message);
};

/**
 * Normal array.forEach method from js is not synchronous
 * This function make "callback" run for each element in array synchronously
 * @param array
 * @param callback
 */
module.exports.asyncForEach = async function(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
