const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: Array
    },
    phone:{
        type: String,
        required: true
    },
    usertype:{
        type: String,
        // required: true,
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile:{
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser-profile&psig=AOvVaw3cGOQBUHWQ13XNkq19KEo1&ust=1748498083977000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiCiYu9xY0DFQAAAAAdAAAAABAE'
    },
    answer:{
        type: String,
        required: true
    },
    

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);