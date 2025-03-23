const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No token in request'
        })
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'User does not exist'
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - status false'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid token'
        })
    }

}


module.exports = {
    jwtValidator
}