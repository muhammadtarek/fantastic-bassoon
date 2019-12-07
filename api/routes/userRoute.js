const express = require('express');
const auth = require('../routes/middleware/auth');
const admin = require('../routes/middleware/admin');
let router = express.Router();
let userController = require('../controllers/userContoller');
const schema = require('../models/schemas');
const ValidationMiddleware = require('./middleware/validation');

router.get('/',[auth,admin],userController.retrieveAllUsers);
router.get('/me',auth,userController.retrieveUser);
router.post('/',ValidationMiddleware(schema.user),userController.createUser);
//router.put('/',[auth,ValidationMiddleware(schema.user)],userController.updateUser);
//router.delete('/:id',[auth,admin],userController.deleteUser);

module.exports = router;