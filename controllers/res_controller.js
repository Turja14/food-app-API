const restaurantModel = require("../models/restaurantModel");

const createResController = async(req, res)=> {
    try{
        const {title, imageURL, foods, time, pickup, delivery, isOpen, logoURL, rating, ratingsCount, code, coords} = req.body;
        if(!title || !coords){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        const newRes = new restaurantModel({title, imageURL, foods, time, pickup, delivery, isOpen, logoURL, rating, ratingsCount, code, coords});

        await newRes.save();

        res.status(201).json({
            success: true,
            message: 'Restaurant created successfully',
            data: newRes
        });

    }catch{
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

//get all restaurants
const getAllRestController = async(req,res) => {
    try{

        const restaurants = await restaurantModel.find({});
        if(!restaurants){
            return res.status(404).json({
                success: false,
                message: 'No restaurants found'
            });
        }

        res.status(200).json({
            success: true,
            total: restaurants.length,
            restaurants
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

//get by id
const getResByIdController = async(req, res) =>{
    try{
        const resId = req.params.id;
        if(!resId){
            return res.status(400).json({
                success: false,
                message: 'Restaurant ID is required'
            });
        }

        // find restaurant by id
        
        const restaurant = await restaurantModel.findById(resId);

        if(!restaurant){
            return res.status(404).json({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).json({
            success: true,
            restaurant
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

module.exports = {createResController, getAllRestController, getResByIdController};