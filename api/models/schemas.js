const Joi = require('joi');

const schemas = {
  reservation: Joi.object()
    .options({ abortEarly: false })
    .keys({
      startTime: Joi.date()
        .greater('now')
        .required(),
      endTime: Joi.date()
        .required()
        .greater('now')
        .greater(Joi.ref('startTime')),
    }),

  user: Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string()
        .min(4)
        .max(50)
        .required(),
      password: Joi.string()
        .min(4)
        .max(50)
        .required(),
      phone: Joi.string().regex(/^0(11|15|12|10)\d{8}$/).min(11).max(11).required().options({
        language: {
          string: { 
            min: 'must be at least 11 digits',
            max: 'must be at least 11 digits',
            regex : 'must begin with 011 015 012 010', },
          any: { required: 'is required' },
        },
      }),
      photo: Joi.string(),
      email: Joi.string()
        .email()
        .min(8)
        .max(50)
        .required(),
      username: Joi.string()
        .min(4)
        .max(50)
        .required(),
      address: Joi.string()
        .min(4)
        .max(50),
      userType: Joi.number(),
    }),
  auth: Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.required(),
      email: Joi.required(),
    }),
  // define all the other schemas below
};
module.exports = schemas;
