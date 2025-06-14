const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized Access",
                    error: err
                })
            }else{
                req.user = decoded;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
}