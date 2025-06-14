const mongoose = require('mongoose');

const connectDB = async () => {

    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        });
        console.log("DB connected successfully");

    } catch (error){
        console.log("DB error",error);
    }

};

module.exports = connectDB;
