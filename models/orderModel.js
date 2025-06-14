const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

   foods:[
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'food'}
    ],
    payment:{},
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'completed', 'cancelled']
    },
   

}, {timestamps: true});

module.exports = mongoose.model('order', orderSchema);