let mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        displayName: {type: String, required: true},
        phone: {type: String},
        dateOfBirth: {type: Date},
        gender: {type: String},
        address: {type: String},
        organizationCode: {type: Array, default: []},
        role: {type: String, default: 'user'},
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);
User.plugin(mongooseDelete, {
    overrideMethods: 'all',
    indexFields: true,
});

// Hash password before save
User.pre('save', function(next) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

// match password
User.method.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', User);
