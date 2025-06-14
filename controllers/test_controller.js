const testUserController = (req,res)=> {
    try{
        res.status(200).send({
            success: true,
            message: 'Test User Controller',
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};


module.exports = testUserController;
