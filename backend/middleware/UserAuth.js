
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

module.exports.isAuthorizedUser = async (req, res, next) => {

    try {
        const token = req.cookies.token;


        if (!token) {
            res.status(401).json({ message: 'unauthorized, token not avalble' });
        } else {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            if (!decode) {
                res.status(401).json({ message: 'unauthorized, token is invalid' });
            }
            else {

                req.id = decode.userId;
                req.user = await userModel.findById(req.id);
                next();
            }
        }


    } catch (err) {
        res.status(404).json({ err: err.message });
    }

}


module.exports.AuthorizedRoles = (...roles) => {

    
    return (req, res, next) => {
        console.log("-->",req.user);
        
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler (
                `Role: ${req.user.role} Access denied , you don't have the required permissions` ,
                403
            ))
        }
        next()
    }
}