const express = require('express');

const authMiddleWare = require('../middlewares/authMiddleWare');
const { createCateController, getAllCateController, updateCateController, deleteCateController } = require('../controllers/cate_controller');


const router = express.Router();

router.post('/create-cate', authMiddleWare, createCateController);
router.get('/get-all-cate', getAllCateController);
router.put('/update-cate/:id', authMiddleWare, updateCateController);
router.delete('/delete-cate/:id', authMiddleWare, deleteCateController); 

module.exports = router;