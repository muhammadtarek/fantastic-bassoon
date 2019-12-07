let mongoose = require('mongoose')

let reservationSchema = new mongoose.Schema({
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "car"
    }
  })

const reservation = mongoose.model("reservation", reservationSchema);
module.exports = reservation;