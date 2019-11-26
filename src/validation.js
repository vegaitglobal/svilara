import { extend, configure } from "vee-validate";
import { email, required, regex, confirmed } from "vee-validate/dist/rules";

// Additional options for validation
configure({ bails: false });

// Validation rules
extend("required", {
  ...required,
  message: "{_field_} je obavezno"
});
extend("email", email);
extend("lengthBetween", {
  validate: (value, { min, max }) => {
    const length = value && value.length;

    return length >= min && length <= max;
  },
  params: ["min", "max"],
  message: "The {_field_} length must be between {min} and {max}"
});
extend('verify_password', {
  message: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(value);
  }
});
extend('confirmed', {
    ...confirmed,
    message: "Šifra se ne poklapa"
})