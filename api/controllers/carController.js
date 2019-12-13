const fs = require('fs');

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
        const cars = await Car.find().sort([['date', -1]]);
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
            price: req.body.price,
            images: null
        });

        // upload car images
        const images = uploadImages(req.body.images, car.name);
        car.images = images;
        car = await car.save();

        res.send(response(car, null, null));
    } catch (error) { res.status(400).send(response(null, 'Sorry, unexpected error happened', error)) };
}

function uploadImages(base64Images, carName) {
    let images = [];
    try {
        var image;
        base64Images.forEach(base64Image => {
            // Extract base64 image
            image = base64Image.match(/data:image\/([a-zA-Z]*);base64,([^\"]*)/),
            imageObj = {};

            if (image.length !== 3) {
            return new Error('Invalid input string');
            }

            imageObj.type = image[1];
            imageObj.data = new Buffer(image[2], 'base64');
            let decodedImg = imageObj;
            let imageBuffer = decodedImg.data;

            let fileName = carName + Date.now() + '.' + decodedImg.type;

            // Save image on server
            fs.writeFileSync("./car-images/" + fileName, imageBuffer, 'utf8');
            images.push("./api/car-images/"+ fileName);
        });
    } catch (ex) {
        console.log('Something faild');
    }
    return images;
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
