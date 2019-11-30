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
      refPath: "user"
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "car"
    }
  })

const reservation = mongoose.model("reservation", reservationSchema);
module.exports = reservation;