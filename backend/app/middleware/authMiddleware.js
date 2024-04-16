const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Account = require('../models/Account.js');

const protect = asyncHandler(async (req, res, next) => {
    let token
    const authHeader = req.headers.authorization

    if(authHeader && authHeader.startsWith('Bearer')) {
        try {
            token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.account = await Account.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}