const jwt = require('jsonwebtoken');
const AppError = require('../utils/app_error')
const authValidation = (req,res,next)=>{
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader === undefined) {
            const error = AppError.create('This Route Is Protect Please Auth in The Fisrt',401)
            next(error)
        }
        const token = authorizationHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET_JWT_KEY,(err,decoded)=>{
        if(err){
            return res.status(401).jsend.error({message:err.message,code:401})
        }
        req.decoded = decoded;
        next();
    })
} 

module.exports = authValidation