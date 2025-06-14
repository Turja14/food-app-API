const categoryModel = require("../models/categoryModel");

const createCateController = async (req, res) => {

    try{
        const{title, imageURL} = req.body;
        if(!title){
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        const newCate = new categoryModel({title, imageURL});
        await newCate.save();
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            newCate
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }  

}

const getAllCateController = async (req, res) => {
    try{

        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                success: false,
                message: 'No categories found'
            });
        }
        res.status(200).json({
            success: true,
            total: categories.length,
            categories
        });
    
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
    
}

const updateCateController = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, imageURL} = req.body;
        const updateCate = await categoryModel.findByIdAndUpdate(id, {title, imageURL}, {new: true});
        if(!updateCate){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            updateCate
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

const deleteCateController = async (req, res) => {
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: 'Category ID is required'
            });
        }
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        });

    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }

}

module.exports = {
    createCateController, getAllCateController, updateCateController, deleteCateController
}