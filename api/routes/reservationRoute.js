var express = require('express');
var router = express.Router();


var reservController = require('../controllers/reservationContoller');
const schemas = require('../models/schemas'); 
const middleware = require('./middleware/validation'); 
const auth = require('../routes/middleware/auth');


router.get('/',auth,reservController.index)

router.get('/:id',auth,reservController.show)

router.post('/:id',auth,middleware(schemas.reservation), reservController.store)

router.patch('/:id',auth,middleware(schemas.reservation),reservController.update)

router.delete('/:id', auth,reservController.delete)


module.exports = router;
