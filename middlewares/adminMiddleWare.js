const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    try{
       
        const user = await userModel.findById(req.body.id);
        if(user.usertype !== 'admin') {
            return res.status(403).send({
                success: false,
                message: "Access Denied, Admins Only"
            });
        } else {
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}