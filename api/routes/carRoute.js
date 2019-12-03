const car_controller = require('..//controllers/carController');

const express = require('express');
const router = express.Router();

router.get('/', car_controller.list_cars);

router.get('/:id', car_controller.car_details);

router.post('/', car_controller.car_creat);

router.put('/:id', car_controller.car_update);

router.delete('/:id', car_controller.car_delete);
module.exports = router;
