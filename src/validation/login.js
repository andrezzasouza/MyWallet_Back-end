import joi from 'joi';

const validateLogIn = joi
  .object({
    email: joi
      .string()
      .email()
      .min(6)
      .lowercase()
      .required(),
    password: joi
      .string()
      .min(6)
      .required(),
  })
.length(2);

export {
  validateLogIn
}