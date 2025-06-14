const express = require('express');
const {registerController}  = require('../controllers/auth_controller');
const {loginController} = require('../controllers/auth_controller');

const router = express.Router();

//register || post

router.post('/register', registerController);


//login || post

router.post('/login', loginController);



module.exports = router;