import joi from 'joi';

const validateEntry = joi.object({
  description: joi
    .string()
    .min(2)
    .required(),
  value: joi
    .number()
    .min(1)
    .integer()
    .positive()
    .required(),
  type: joi
    .string()
    .valid('income', 'expense')
    .required()
}).length(3);

//confirm that it wouldn't allow things other than numbers when using Thunder Client

export {
  validateEntry
}