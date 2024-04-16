const UserRouter = require('./user');
const AccountRouter = require('./account');

function route(app) {
    // Users
    app.use('/users', UserRouter);
}

module.exports = route;