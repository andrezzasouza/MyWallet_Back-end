import joi from 'joi';

const validateSignUp = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().min(6).pattern().required(),
  password: joi.string().min(8),
  repeatPassword: joi.string()
})

// complete validation
// update along with logins
// add regex

export {
  validateSignUp
}