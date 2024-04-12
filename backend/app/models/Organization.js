const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Organization = new Schema(
    {
        name: {type: String, required: true},
        abbieviatedName: {type: String},
        oCode: {type: String, required: true},
        type: {type: String}
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);
Organization.plugin(mongooseDelete, {
    overrideMethods: 'all',
    indexFields: true,
});

module.exports = mongoose.model('Organization', Organization);