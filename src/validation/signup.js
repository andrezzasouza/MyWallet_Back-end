import joi from 'joi';

const validateSignUp = joi
  .object({
    name: joi
      .string()
      .min(2)
      .pattern(/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\- ]+/i)
      .required(),
    email: joi
      .string()
      .email()
      .min(6)
      .required(),
    password: joi
      .string()
      .min(6)
      .required(),
    repeatPassword: joi
      .string()
      .required()
      .valid(joi.ref("password")),
  })
.length(4);

// limit max length of names?

export {
  validateSignUp
}