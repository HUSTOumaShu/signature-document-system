let mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);
Account.plugin(mongooseDelete, {
    overrideMethods: 'all',
    indexFields: true,
    deletedAt: true,
});

module.exports = mongoose.model('Account', Account);
