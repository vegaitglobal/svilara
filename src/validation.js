// import { extend, configure } from "vee-validate";
// import { email, required, regex, confirmed } from "vee-validate/dist/rules";

// // Additional options for validation
// configure({ bails: false });

// // Validation rules
// extend("required", {
//   ...required,
//   message: "{_field_} je obavezno"
// });
// extend("email", email);
// extend("lengthBetween", {
//   validate: (value, { min, max }) => {
//     const length = value && value.length;

//     return length >= min && length <= max;
//   },
//   params: ["min", "max"],
//   message: "The {_field_} length must be between {min} and {max}"
// });
// extend("verify_password", {
//   message: field =>
//     `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
//   validate: value => {
//     var strongRegex = new RegExp(
//       "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
//     );
//     return strongRegex.test(value);
//   }
// });
// extend("confirmed", {
//   ...confirmed,
//   message: "Šifra se ne poklapa"
// });
// extend("date_format", {
//   validate: value => {
//     let arrayDate = value.split(".");
//     try {
//        let date = new Date(
//         arrayDate[2],
//         arrayDate[1] - 1,
//         arrayDate[0]
//       )
//       date.toISOString();
//       let flag = new Date(new Date().toDateString()) <= date;
//       return flag;
//     } catch (err) {
//       return false;
//     }
//   },
//   message: "Datum nije ispravan"
// });
// extend("time_format", {
//   validate: value => {
//     var strongRegex = new RegExp(
//       "^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
//     );
//     return strongRegex.test(value);
//   },
//   message: "Vreme nije ispravno"
// });
// extend("atLeastOneFilled", {
//   validate: (value, selectedOptions) => {
//    if (selectedOptions.length > 0){
//      if (selectedOptions.length == 1 && (selectedOptions[0] == "" || selectedOptions[0] == "Drugo / Other") ){
//        return false;
//      }
//     return true;
//    }
//     else return false
//   },
//   message: "Mora bar jedno polje biti popunjeno"
// })
