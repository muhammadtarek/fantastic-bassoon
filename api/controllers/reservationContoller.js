var reservation = require('../models/reservation');


userId="5de6a0cc0531d6627c420e02";


exports.index = async function(req, res) {
    const reservations = await reservation.find({userId:userId}).select("-__v").populate('userId').populate('carId').exec();
    return res.status(200).json({data : reservations, message : null , errors : null});
};

exports.store = async function(req, res) {
    const newReservation = new reservation({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        userId : userId,
        carId:"5de6a0cc0531d6627c420e01"
      });
    const reservationSaved = await newReservation.save();
    return res.status(200).json({data : reservationSaved , message : null , errors : null});
};

exports.show = async function(req, res) {
    const reservations = await reservation.find({_id:req.params.id}).select("-__v").populate('userId').populate('carId').exec();
    return res.status(200).json({data : reservations , message : null , errors : null});
};

exports.update = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.delete = async function(req, res) {
    const reservations = await reservation.deleteMany({_id:req.params.id}).exec();
    return res.status(200).json({data : reservations , message : null , errors : null});
};