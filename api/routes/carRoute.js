const car_controller = require('..//controllers/carController');

const express = require('express');
const router = express.Router();
const auth = require('../routes/middleware/auth');
const admin = require('../routes/middleware/admin');


// Get request for list of all cars 
router.get('/',auth, car_controller.list_cars);

// Get request for displaying one car
router.get('/:id',auth, car_controller.car_details);

// Post request for creating new car
router.post('/',[auth,admin], car_controller.car_creat);

// Put request for editing existing car
router.put('/:id',admin, car_controller.car_update);

// Delete request for deleting existing car
router.delete('/:id',admin, car_controller.car_delete);

module.exports = router;
