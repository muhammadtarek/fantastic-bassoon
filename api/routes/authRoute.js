const express = require('express');
let router = express.Router();
let authController = require('../controllers/authController');
const schema = require('../models/schemas');
const ValidationMiddleware = require('./middleware/validation');

router.post('/',ValidationMiddleware(schema.auth),authController.login);

module.exports = router;