const User = require('../models/userModel'); // adjust the path if needed
const bcrypt = require('bcryptjs'); // for password hashing


const getUserController = async (req,res) => {
    try{
        const user = await User.findById(req.user.id)    
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        user.password = undefined; // Remove password from response
        res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user
        });
    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}


//update user controller
const updateUserController = async (req, res) => {
    try{
        //find user by id
        const user = await User.findById(req.user.id);
        //validate user
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        //update user
        const {username, email, phone, password, address} = req.body;
        if(username) user.username = username;
        if(email) user.email = email;
        if(phone) user.phone = phone;
        if(address) user.address = address;
        saveUser = await user.save();
        res.status(200).send({
            success: true,
            message: "User updated successfully",
            user: saveUser
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}

//resetpassword controller

const resetPasswordController = async (req, res) => {
    try{
        const { email, answer, newPassword } = req.body;
        if (!email || !answer || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            });
        }
        //find user by email
        const user = await User.findOne({ email,answer });
        //validate user
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found or answer is incorrect"
            });
        }
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }

}

//delete user controller
const deleteUserController = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "User deleted successfully"
        });

    }catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}

module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    deleteUserController
};


