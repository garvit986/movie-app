const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const statusCodes = require("../validations/statusCodes");

const isAuthenticated = async(req,res) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(statusCodes.UNAUTHORIZED).json({ success: false, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user =  await User.findOne({where: {username: decoded.username}})
        if (!user) {
            return res.status(statusCodes.UNAUTHORIZED).json({ success: false, message: 'Invalid token' });
        }
        req.user = user
        next();
    } catch (error) {
        res.status(statusCodes.UNAUTHORIZED).json({ success: false, message: 'Invalid token or user not found' });
    }

}

module.exports = {isAuthenticated}