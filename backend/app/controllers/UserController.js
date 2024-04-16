const User = require('../models/User');
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose');

class UserController {

    // [POST] /users/register
    async register(req, res, next) {
        const data = req.body;
        const userExists = await User.findOne({email: data.email})
        if(userExists) {
            res.status(400);
            res.json('User already exists');
        }
        const user = new User(data);
        console.log(user)
        user.save()
        .then(() => res.status(201).json({
            _id: user._id,
            email: user.email,
        }))
        .catch(next);
    }

    // [POST] /users/login
    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                email: user.email,
                userToken: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }

    // [GET] /users/profile
    async getProfile(req, res, next) {
        const user = await User.findOne({email: req.user.email});
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
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    }

    // [GET] /users/list
    showAll(req, res, next) {
        User.find({})
        .then(users => {
            res.json(multipleMongooseToObject(users));
        })
        .catch(next);
    }

    // [POST] /users/store
    store(req, res, next) {
        const data = req.body;
        if(data.photoURL === '') {
            data.photoURL = 'https://via.placeholder.com/150';
        }
        const user = new User(data);
        user
            .save()
            .then(() => res.json('OK'))
            .catch(next);
    }
}

module.exports = new UserController();