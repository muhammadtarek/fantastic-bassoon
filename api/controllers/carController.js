const {Car, validateCar} = require('../models/car')

// return  {data, message, errors} JSON object as res object  
function response(req_data, msg, err) {
    return {
        data: req_data,
        message: msg,
        errors: err
    };
}

// return errors to be displayed on client side
function get_errors (error) {
    var errors = {};
    error.details.forEach( function (detail) {
        errors[detail.path[0]] = detail.message.split("\"")[2];
    });

    return errors;
}

// Display list of cars
exports.list_cars = async function (req, res) {
    try {
        const cars = await Car.find();
        if(!cars)
            return res.status(404).send(response(null, 'No cars available', null));
        
        res.send(response(cars, null, null));
    } catch (error) { res.status(400).send(response(null,'Invalid link',error)) };
}

// Display specific car details
exports.car_details = async function (req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if(!car)
            return res.status(404).send(response(req.params.id, 'Car not found', null));
        
        res.send(response(car, null, null));   
    } catch (error) { res.status(400).send(response(null, 'Sorry, unexpected error happened', error)) };
}

// Create new car
exports.car_creat = async function (req, res) {
    try {
        // validate request body
        const {error} = validateCar(req.body);  
        if(error){
            const errors = get_errors(error);
            return res.status(400).send(response(req.body, 'Please enter valid data', errors)) 
        }
        let car = new Car ({
            name: req.body.name,
            color: req.body.color,
            description: req.body.description,
            phone: req.body.phone,
            price: req.body.price,
            images: req.body.images
        });
    
        car = await car.save();
        res.send(response(car, null, null));
    } catch (error) { res.status(400).send(response(null, 'Sorry, unexpected error happened', error)) };
}

// Delete specific car
exports.car_delete = async function (req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if(!car)
            return res.status(404).send(response(null, 'car not found', null));
        
        const result = await Car.deleteOne({_id: req.params.id});
        res.send(response(result, null, null));

    } catch (error) { res.status(400).send(response(null, 'Sorry, unexpected error happened', error)) };
}

// Update specific car
exports.car_update = async function (req, res) {
    try {
        let car = await Car.findById(req.params.id);
        if(!car)
        return res.status(404).send(response(null, 'car not found', null));

        car.name = (req.body.name) ? req.body.name : car.name; 
        car.color = (req.body.color) ? req.body.color : car.color; 
        car.description = (req.body.description) ? req.body.description : car.description; 
        car.phone = (req.body.phone) ? req.body.phone : car.phone; 
        car.price = (req.body.price) ? req.body.price : car.price; 
        car.images = (req.body.images) ? req.body.images : car.images; 
    
        // validate car before updating data
        const {error} = validateCar(car);  
        if(error){
            const errors = get_errors(error);
            return res.status(400).send(response(req.body, 'Please check your data to update your car information', errors)) 
        }

        car = await car.save();
        res.send(response(car, null, null));
    } catch (error) { res.status(400).send(response(null, 'Sorry, unexpected error happened', error)) };
}
