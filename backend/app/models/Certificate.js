const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Certificate = new Schema(
    {
        CN: {type: String},
        Issuer: {type: String},
        serial: {type: String},
        signature: {type: String},
        validFrom: {type: Date},
        validTo: {type: Date},
        basicCA: {type: Boolean},
        keyUsage: {type: Array, default: []},
        subjectKeyId: {type: String},
        authorityKeyId: {type: String},
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);
Certificate.plugin(mongooseDelete, {
    overrideMethods: 'all',
    indexFields: true,
});

module.exports = mongoose.model('Certificate', Certificate);