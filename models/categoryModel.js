const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
   },
   
   imageURL: {
        type: String,
        
   },


   


}, {timestamps: true});

module.exports = mongoose.model('category', categorySchema);