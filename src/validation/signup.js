import joi from 'joi';

const validateSignUp = joi
  .object({
    name: joi.string().min(2).max(40).required(),
    email: joi.string().email().min(6).lowercase().required(),
    password: joi.string().min(6).required(),
    repeatPassword: joi.string().required().valid(joi.ref('password'))
  })
  .length(4);

export { validateSignUp };
