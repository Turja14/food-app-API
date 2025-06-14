const express = require('express');
const { getUserController, updateUserController, resetPasswordController, deleteUserController } = require('../controllers/user_controller');
const authMiddleWare = require('../middlewares/authMiddleWare');


const router = express.Router();

//get user||get

router.get('/get-user', authMiddleWare, getUserController);


//update user
router.put('/update-user', authMiddleWare, updateUserController);

//reset password
router.post('/reset-password', authMiddleWare, resetPasswordController);

//delete user
router.delete('/delete-user/:id', authMiddleWare, deleteUserController)



module.exports = router;