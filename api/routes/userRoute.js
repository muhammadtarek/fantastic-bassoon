const express = require('express');
const auth = require('../routes/middleware/auth');
const admin = require('../routes/middleware/admin');
let router = express.Router();
let userController = require('../controllers/userContoller');
const schema = require('../models/schemas');
const ValidationMiddleware = require('./middleware/validation');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './user-photo/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer ({ storage: storage });

router.get('/',[auth,admin],userController.retrieveAllUsers);
router.get('/me',auth,userController.retrieveUser);
router.post('/',[upload.single('photo'), ValidationMiddleware(schema.user)],userController.createUser);
//router.put('/',[auth,ValidationMiddleware(schema.user)],userController.updateUser);
//router.delete('/:id',[auth,admin],userController.deleteUser);

module.exports = router;