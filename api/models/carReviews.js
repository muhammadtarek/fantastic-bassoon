let mongoose = require('mongoose')

let carReviewSchema = new mongoose.Schema({
    review: {
      type: String,
      required: true,
    },
    rate: {
        type: Number,
        required: true,
        min : 0,
        max : 5
      },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "user"
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "car"
    }
  })

const carReview = mongoose.model("carReview", carReviewSchema);
module.exports = carReview;