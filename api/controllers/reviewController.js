let reviewModel = require('../models/review');
let {Car, validateCar} = require('../models/car')

exports.createReview = async function(req,res){
   
    let review = new reviewModel({
        review: req.body.review,
        carId: req.body.carId,
        userId: req.user._id
    });
   await review.save();

   const car = await Car.findById(req.body.carId);

   car.reviews.push(review);
        await car.save();

   return res.status(200).json({data : review, message : null , errors : null});
}