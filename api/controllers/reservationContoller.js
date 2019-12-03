var reservation = require('../models/reservation');
exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.store = function(req, res) {
    return res.status(500).json({data : req.body , message : null , errors : null});
};

exports.show = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.update = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};