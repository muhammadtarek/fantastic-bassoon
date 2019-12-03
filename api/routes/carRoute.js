const car_controller = require('..//controllers/carController');

const express = require('express');
const router = express.Router();

// Get request for list of all cars 
router.get('/', car_controller.list_cars);

// Get request for displaying one car
router.get('/:id', car_controller.car_details);

// Post request for creating new car
router.post('/', car_controller.car_creat);

// Put request for editing existing car
router.put('/:id', car_controller.car_update);

// Delete request for deleting existing car
router.delete('/:id', car_controller.car_delete);

module.exports = router;
