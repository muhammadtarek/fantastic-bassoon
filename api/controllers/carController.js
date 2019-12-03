const {Car, validateCar} = require('../models/car')

// Display list of cars
exports.list_cars = async function (req, res) {
    const cars = await Car.find();
    if(!cars)
        return res.status(404).send(new Error('No cars available'));
    
    res.send(cars);
}

// Display specific car details
exports.car_details = async function (req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if(!car)
            return res.status(404).send(new Error('Car not found'));
        
        res.send(car);   
    } catch (error) { res.status(400).send(error) }
}

// Create new car
exports.car_creat = async function (req, res) {
    try {
        // validate request body
        const {error} = validateCar(req.body);  
        if(error){
            console.log('joi', error.details[0].message);
            return res.status(400).send(error.details[0].message);
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
        res.send(car);    
    } catch (error) { res.status(400).send(error) }
}

// Delete specific car
exports.car_delete = async function (req, res) {
    try {
        const car = await Car.findById(req.params.id);
        if(!car)
            return res.status(404).send(new Error('car not found'));
        
        const result = await Car.deleteOne({_id: req.params.id});
        res.send(result);
    } catch (error) { return res.status(400).send(error) }
}

// Update specific car
exports.car_update = async function (req, res) {
    try {
        let car = await Car.findById(req.params.id);
        if(!car)
            return res.status(404).send(new Error('car not found'));
    
        car.name = (req.body.name) ? req.body.name : car.name; 
        car.color = (req.body.color) ? req.body.color : car.color; 
        car.description = (req.body.description) ? req.body.description : car.description; 
        car.phone = (req.body.phone) ? req.body.phone : car.phone; 
        car.price = (req.body.price) ? req.body.price : car.price; 
        car.images = (req.body.images) ? req.body.images : car.images; 
    
        car = await car.save();
        res.send(car);
    } catch (error) {res.status(400).send(error)}
}
