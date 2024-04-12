const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Document = new Schema(
    {
        title: {type: String, required: true},
        from: {type: String},
        to: {type: String},
        docRef: {type: String},
        xfdf: {type: Array, default: []},
        signedBy: {type: Array, default: []},
        requestedTime: {type: Date},
        signedTime: {type: Date},
        signed: {type: Boolean, default: false},
        isRefused: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);
Document.plugin(mongooseDelete, {
    overrideMethods: 'all',
    indexFields: true,
});

module.exports = mongoose.model('Document', Document);