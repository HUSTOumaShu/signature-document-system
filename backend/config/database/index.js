const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/signature-document-system', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully!")
    } catch (err) {
        console.error('Could not connect to MongoDB!', err);
    }
}

module.exports = { connect };