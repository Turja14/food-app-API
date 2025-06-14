const userModel = require('../models/userModel'); // adjust path if needed
const bcrypt = require('bcryptjs'); // for password hashing
const JWT = require('jsonwebtoken'); // for token generation


const registerController = async (req,res) => {
    try{
        const {username, email, password, phone, address, answer} = req.body;
        //validation
        if(!username || !email || !password || !phone || !address || !answer){
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        //check if user already exists
        const existing = await userModel.findOne({email});
        if(existing){
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            });
        }
        //hash password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //create new user

        const user = await userModel.create({username, email, password:hashedPassword, phone, address, answer});
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        });

        

    
    }catch (error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error

        });
    }
};


//login

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        // ✅ Don't exclude password
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // ✅ Remove password from response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'User logged in successfully',
            token,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
};


module.exports = { registerController, loginController };

