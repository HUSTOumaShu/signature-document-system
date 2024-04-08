let mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        uid: {type: String, required: true},
        email: {type: String, required: true},
        displayName: {type: String, required: true},
        photoURL: {type: String, required: false},
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
