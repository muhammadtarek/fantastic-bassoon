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
      phone: Joi.required(),
      photo: Joi.required(),
      email: Joi.string()
        .min(10)
        .max(50)
        .required(),
      username: Joi.string()
        .min(4)
        .max(50)
        .required(),
      address: Joi.string()
        .min(4)
        .max(50)
        .required(),
      userType: Joi.number().required(),
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
