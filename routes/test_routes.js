const express = require('express');
const testUserController = require('../controllers/test_controller');

const router = express.Router();

//routes get | post | put | delete

router.get('/test_user', testUserController);


module.exports = router;
