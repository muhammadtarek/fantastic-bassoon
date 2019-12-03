var express = require('express');
var router = express.Router();


var reservController = require('../controllers/reservationContoller');
const schemas = require('../models/schemas'); 
const middleware = require('./middleware/validation'); 


router.get('/',reservController.index)

router.get('/:id',reservController.show)

router.post('/',middleware(schemas.reservation), reservController.store)

router.patch('/:id',middleware(schemas.reservation),reservController.update)

router.delete('/:id', reservController.delete)


module.exports = router;
