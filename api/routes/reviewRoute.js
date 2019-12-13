var express = require('express');
var router = express.Router();


var reservController = require('../controllers/reviewContoller');
const middleware = require('./middleware/validation'); 
const auth = require('../routes/middleware/auth');


router.post('/',auth,reservController.createReview);


module.exports = router;