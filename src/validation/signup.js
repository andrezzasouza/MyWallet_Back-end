import joi from 'joi';

const validateSignUp = joi
  .object({
    name: joi.string().min(2).required(),
    email: joi.string().min(6).required(),
    password: joi.string().min(6),
    repeatPassword: joi.ref("password"),
  })
  .length(4);

// complete validation
// validate email format
// name should only allow letters and spaces, no numbers or symbols
// update along with logins
// add regex
// add max char for fields?

export {
  validateSignUp
}