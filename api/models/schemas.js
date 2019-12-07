const Joi = require('joi') 
const schemas = { 
  reservation: Joi.object().options({ abortEarly: false }).keys({ 
    startTime: Joi.date().greater('now').required(),
    endTime: Joi.date().required().greater('now').greater(Joi.ref('startTime')),
  }),
  
  user: Joi.object().options({ abortEarly: false }).keys({ 
    name: Joi.required().string().min(4).max(50),
    password: Joi.required().min(4).max(30),
    phone : Joi.required().min(11).max(11),
    photo : Joi.required(),
    email : Joi.required().string().min(10).max(50),
    username : Joi.required().string().min(4).max(50),
    address : Joi.required().string().min(4).max(50),
   
  }),
  auth:Joi.object().options({ abortEarly: false }).keys({ 
    password: Joi.required(),
    email : Joi.required(),
  }),
  // define all the other schemas below 
};
module.exports = schemas;