let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
    }, {
        timestamps: true,
    }
)

// Hash password before save
Account.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

// match password
Account.method.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('Account', Account);