const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        trim: true,
        required: true,
        min:3,
        max:255
    },
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    
});

const review = mongoose.model('review', reviewSchema);

module.exports = review;