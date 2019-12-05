const express = require('express');
let router = express.Router();
let userController = require('../controllers/userContoller');
const schema = require('../models/schemas');
const ValidationMiddleware = require('./middleware/validation');

//router.get('/',userController.retrieveAllUsers);
//router.get('/:id',userController.retrieveUser);
router.post('/',ValidationMiddleware(schema.user),userController.createUser);
//router.put('/:id',ValidationMiddleware(schema.user),userController.updateUser);
//router.delete('/:id',userController.deleteUser);

module.exports = router;