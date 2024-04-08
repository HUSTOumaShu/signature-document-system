const UserRouter = require('./user');

function route(app) {
    // Accounts
    app.use('/users', UserRouter);
}

module.exports = route;