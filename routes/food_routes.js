const express = require('express');

const authMiddleWare = require('../middlewares/authMiddleWare');
const adminMiddleWare = require('../middlewares/adminMiddleWare');
const { createFoodController, getFoodController, getSingleFoodController, getFoodByRestaurantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController} = require('../controllers/food_controller');


const router = express.Router();


router.post("/create-food",authMiddleWare, createFoodController);
router.get("/get-food", getFoodController);
router.get("/get-food/:id", getSingleFoodController);
router.get("/get-food-by-restaurant/:id", getFoodByRestaurantController); 
router.put("/update-food/:id", authMiddleWare, updateFoodController);
router.delete("/delete-food/:id", authMiddleWare, deleteFoodController);
router.get("/placeOrder", authMiddleWare, placeOrderController)


router.post("/orderStatus/:id", authMiddleWare, adminMiddleWare, orderStatusController)



module.exports = router;