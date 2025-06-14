const FoodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
    try{
        const {title, description, price, imageURL, foodTags, category, code, isAvailable, Restaurant, rating} = req.body;

        // Validate required fields
        if(!title || !description || !price || !Restaurant) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const newFood = new FoodModel({
            title,
            description,
            price,
            imageURL,
            foodTags,
            category,
            code,
            isAvailable, // Default to true if not provided
            Restaurant,
            rating});

        await newFood.save();
        res.status(201).json({
            success: true,
            message: 'Food item created successfully',
            newFood
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const getFoodController = async (req, res) => {
    try{
        const foods = await FoodModel.find({})
        if(!foods) {
            return res.status(404).json({
                success: false,
                message: 'No food items found'
            });
        }
        res.status(200).json({
            success: true,
            total: foods.length,
            message: 'Food items retrieved successfully',
            foods
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const getSingleFoodController = async (req, res) => {
    try{
        const foodId = req.params.id;
        if(!foodId) {
            return res.status(400).json({
                success: false,
                message: 'Food ID is required'
            });
        }

        const food = await FoodModel.findById(foodId);
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Food item retrieved successfully',
            food
        }); 

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const getFoodByRestaurantController = async (req, res) => {
    try{
        const restaurantId = req.params.id;
        if(!restaurantId) {
            return res.status(400).json({
                success: false,
                message: 'Restaurant ID is required'
            });
        }

        const foods = await FoodModel.find({Restaurant: restaurantId});
        if(!foods || foods.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No food items found for this restaurant'
            });
        }
        res.status(200).json({
            success: true,
            total: foods.length,
            message: 'Food items retrieved successfully',
            foods
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const updateFoodController = async (req, res) => {
    try{
        const foodId = req.params.id;
        if(!foodId) {
            return res.status(400).json({
                success: false,
                message: 'Food ID is required'
            });
        }

        const food = await FoodModel.findById(foodId);
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }
        const {title, description, price, imageURL, foodTags, category, code, isAvailable, Restaurant, rating} = req.body;

        const updatedFood = await FoodModel.findByIdAndUpdate(foodId, {title, description, price, imageURL, foodTags, category, code, isAvailable, Restaurant, rating}, {new: true});

        res.status(200).json({
            success: true,
            message: 'Food item updated successfully',
            updatedFood
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const  deleteFoodController = async (req, res) => {
    try{
        const foodId = req.params.id;
        if(!foodId) {
            return res.status(400).json({
                success: false,
                message: 'Food ID is required'
            });
        }

        const food = await FoodModel.findById(foodId);
        if(!food) {
            return res.status(404).json({
                success: false,
                message: 'Food item not found'
            });
        }

        await FoodModel.findByIdAndDelete(foodId);
        res.status(200).json({
            success: true,
            message: 'Food item deleted successfully'
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const placeOrderController = async (req, res) => {
    try{
        const{cart} = req.body;
        if(!cart) {
            return res.status(400).json({
                success: false,
                message: 'Cart and payment details are required'
            });
        }
        let total = 0;
        cart.map((i) =>{
            total += i.price;

        })
        const newOrder = new orderModel({
            foods: cart,
            payment,
            buyer: req.user._id,
        });
        await newOrder.save();
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            newOrder
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const orderStatusController = async (req, res) => {
    try{

        const orderID = req.params.id;
        if(!orderID) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required'
            });
        }
        const {status} = req.body;
        if(!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }
        const order = await orderModel.findByIdAndUpdate(orderID, {status}, {new: true});
        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

module.exports = {createFoodController, getFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController,orderStatusController};