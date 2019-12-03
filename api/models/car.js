const mongoose = require('mongoose');
const joi = require('joi');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        min:3,
        max:255
    },
    color: {
        type: String,
        trim: true,
        required: true,
        min:3,
        max:15
    },
    price: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true
    },
    phone: {
        type: String,
        required: true,
        min: 11,
        max: 11
    },
    description: {
        type: String,
        required: true,
        default: 'no description'
    },
});

const Car = mongoose.model('Car', carSchema);

function validateCar(car) {
    const schema = {
        name: joi.string().min(3).max(255).required(),
        color: joi.string().required(),
        price: joi.number().greater(0).required(),
        images: joi.array().items(joi.string().required()).required(),
        phone: joi.string().min(11).max(11).required(),
        description: joi.string()
    }
    return joi.validate(car, schema, {
        allowUnknown: true,
        stripUnknown: {
            objects: true
        }
    });
}

exports.carSchema = carSchema;
exports.Car = Car;
exports.validateCar = validateCar;