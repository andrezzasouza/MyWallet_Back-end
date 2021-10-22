import joi from 'joi';

const validateLogIn = joi.object({
  email: joi.string().min(2).required(),
  password: joi.string().min(8)
});

// update along with signup
// add regex

export {
  validateLogIn
}