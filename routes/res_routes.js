const express = require('express');

const authMiddleWare = require('../middlewares/authMiddleWare');
const { createResController, getAllRestController, getResByIdController } = require('../controllers/res_controller');


const router = express.Router();

//create res
router.post('/create-res', authMiddleWare, createResController);

//get all restaurants
router.get('/getall', getAllRestController)

//get by id
router.get('/get/:id', getResByIdController);

module.exports = router;