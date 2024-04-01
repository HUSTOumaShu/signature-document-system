const Account = require('../models/Account');
const {mongooseToObject} = require('../../util/mongoose');

class AccountController {
    // [GET] /accounts
    show(req, res, next) {
        Account.find({})
            .then(accounts => {
                res.render('accounts', {
                    accounts: mongooseToObject(accounts)
                });
            })
            .catch(next);
    }
    // [POST]
}