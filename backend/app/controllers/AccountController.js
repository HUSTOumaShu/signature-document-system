const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose');
const Account = require('../models/Account');
const User = require('../models/User');

class AccountController {

    // POST /register
    async register(req, res, next) {
        const {email, password} = req.body;
        const accountExists = Account.findOne({email: email});
        if(accountExists) {
            res.status(400);
            throw new Error('Account already exists');
        }
        // create new account and user
        const account = await Account.create({email, password});
        if(account) {
            res.status(201).json({
                _id: account._id,
                email: account.email,
            });
        } else {
            res.status(400);
            throw new Error('Invalid account data');
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const account = await Account.findOne({email});
        if(account && await account.matchPassword(password)) {
            res.json({
                _id: account._id,
                email: account.email,
                userToken: generateToken(account._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }

    async getProfile(req, res, next) {
        const user = await User.findOne({email: req.account.email});
        if(user) {
            res.json({
                _id: user._id,
                email: user.email,
                displayName: user.displayName,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
                gender: user.gender,
                address: user.address,
                organizationCode: user.organizationCode,
                role: user.role,
            })
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }
}

module.exports = new AccountController();