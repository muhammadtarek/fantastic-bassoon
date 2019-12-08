var reservationModel = require('../models/reservation');


exports.index = async function(req, res) {
    // return res.status(200).json(req.user._id);
    const reservations = await reservationModel.find({userId:req.user._id}).select("-__v").populate('userId').populate('carId').exec();
    return res.status(200).json({data : reservations, message : null , errors : null});
};

exports.store = async function(req, res) {
    //update time to timezone "cairo"
    startTime=updateTime(req.body.startTime);
    endTime=updateTime(req.body.endTime);
    //cehck valida reservations
    const reservations = await reservationModel.find({carId:req.params.id}).exec();
    errs=checkReservations(startTime,endTime,req.params.id,reservations);    
    if(errs){
        return res.status(422).json({data : req.body , message : "Invalid Time" , errs : errs});
    }
    //make reservation
    const newReservation = new reservationModel({
        startTime: startTime,
        endTime: endTime,
        userId : req.user._id,
        carId:req.params.id
      });
    const reservationSaved = await newReservation.save();
    return res.status(200).json({data : reservationSaved , message : null , errors : null});
};

exports.show = async function(req, res) {
    const reservations = await reservationModel.find({_id:req.params.id}).select("-__v").populate('userId').populate('carId').exec();
    return res.status(200).json({data : reservations , message : null , errors : null});
};

exports.update = async function(req, res) {
    //update time to timezone "cairo"
    startTime=updateTime(req.body.startTime);
    endTime=updateTime(req.body.endTime);
    //get reservation
    let reservation=await reservationModel.find({_id:req.params.id}).exec();
    //cehck valida reservations
    const reservations = await reservationModel.find({carId:reservation.carId}).exec();
    errs=checkReservations(startTime,endTime,reservation.carId,reservations);    
    if(errs){
        return res.status(422).json({data : req.body , message : "Invalid Time" , errs : errs});
    }
    const reservation = await reservationModel.updateOne({
        _id: req.params.id
      }, {
        $set: {
        startTime: startTime,
        endTime: endTime,
        }
      }).exec(); 
    return res.status(200).json({data : reservation , message : null , errors : null});
};

exports.delete = async function(req, res) {
    const reservations = await reservationModel.deleteMany({_id:req.params.id}).exec();
    return res.status(200).json({data : reservations , message : null , errors : null});
};

function checkReservations(startTime , endTime , carId,reservations){
    var errors={};
    console.log(startTime);
    console.log(endTime);
    for (const reservation of reservations) {
        if(reservation.carId == carId){
            if(startTime.getTime() >= reservation.startTime.getTime()  && startTime.getTime()  <= reservation.endTime.getTime() ){
                errors.startTime="car was reserved from "+reservation.startTime.toLocaleString('en-IN')+" to "+reservation.endTime.toLocaleString('en-IN') +", plz choose another startTime";
            }
            if(endTime.getTime()  >= reservation.startTime.getTime()  && endTime.getTime()  <= reservation.endTime.getTime() ){
                errors.endTime="car was reserved from "+reservation.startTime.toLocaleString('en-IN')+" to "+reservation.endTime.toLocaleString('en-IN') +", plz choose another startTime";
            }
            if(reservation.startTime.getTime()  >= startTime.getTime()  && reservation.startTime.getTime()  <= endTime.getTime() ){
                errors.startTime="car was reserved from "+reservation.startTime.toLocaleString('en-IN')+" to "+reservation.endTime.toLocaleString('en-IN') +", plz choose another startTime";
            }
            if(reservation.endTime.getTime()  >= startTime.getTime()  && reservation.endTime.getTime()  <= endTime.getTime() ){
                errors.startTime="car was reserved from "+reservation.startTime.toLocaleString('en-IN')+" to "+reservation.endTime.toLocaleString('en-IN') +", plz choose another startTime";
            }
      }
    }
    if(isEmpty(errors)) return null;
    return errors;
}

function isEmpty(obj) {
    return Object.getOwnPropertyNames(obj).length === 0;
}

function updateTime(time){
    newTime=new Date(time);
    newTime.setSeconds(0,0);
    newTime.setHours( newTime.getHours() + 2 );
    return newTime;
}