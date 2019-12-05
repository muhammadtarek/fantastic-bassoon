const Joi = require('joi') 
const schemas = { 
  reservation: Joi.object().options({ abortEarly: false }).keys({ 
    startTime: Joi.date().greater('now').required(),
    endTime: Joi.date().required().greater('now').greater(Joi.ref('startTime')),
  }),
  
  user: Joi.object().options({ abortEarly: false }).keys({ 
    name: Joi.required(),
    password: Joi.required(),
  })  
  // define all the other schemas below 
};
module.exports = schemas;