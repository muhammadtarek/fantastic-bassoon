var express = require('express');
var router = express.Router();


var reviewController = require('../controllers/reviewController');
const middleware = require('./middleware/validation'); 
const auth = require('../routes/middleware/auth');


router.post('/',auth,reviewController.createReview);


module.exports = router;