const User = require('../models/User');
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose');

class UserController {
    // [GET] /users
    showAll(req, res, next) {
        User.find({})
        .then(users => {
            res.json(multipleMongooseToObject(users));
        })
        .catch(next);
    }

    // [GET] /users/:uid
    show(req, res, next) {
        User.findOne({uid: req.params.uid})
        .then(user => {
            res.json(mongooseToObject(user));
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