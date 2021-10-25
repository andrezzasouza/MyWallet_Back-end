import joi from 'joi';

const validateEntry = joi.object({
  description: joi
    .string()
    .min(2)
    .required(),
  value: joi
    .number()
    .min(2)
    .required(),
  type: joi
    .string()
    .required()
}).length(3);

export {
  validateEntry
}