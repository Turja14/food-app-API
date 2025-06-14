const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
   },
   description: {
        type: String,
        required: true
   },
   price: {
        type: Number,
        required: true
   },
   imageURL: {
        type: String,
        
   },
   foodTags: {
        type: String,
        
   },
   category: {
        type: String
   },
   code:{
        type: String,
        
   },
   isAvailable: {
        type: Boolean,
        default: true
   },
   Restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'newRest'
   },
   rating:{
        type: Number, 
        default: 5, 
        min: 1,
        max: 5 
   },
    ratingsCount: {
          type: Number, 
    },

}, {timestamps: true});

module.exports = mongoose.model('food', foodSchema);