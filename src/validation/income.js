import joi from 'joi';

const validateIncome = joi.object({
  description: joi.string().min(2).required(),
  value: joi.number().required(),
  type: joi.string().required()
})

// improve validation

export {
  validateIncome
}