let mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: {type: String, required: true},
        displayName: {type: String, required: true},
        phone: {type: String},
        dateOfBirth: {type: Date},
        gender: {type: String},
        address: {type: String},
        organizationCode: {type: String},
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

module.exports = mongoose.model('User', User);
