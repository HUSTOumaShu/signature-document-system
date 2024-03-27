const express = require('express')
const morgan = require('morgan')
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const fs = require('fs');
const {PDFNet} = require('@pdftron/pdfnet-node');
const cors = require('cors');

require('dotenv').config()

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(morgan('combined'))

const db = require('./config/database');
db.connect();

app.get('/', (req, res) => {
    console.log(req.query)
    res.status(200).json({
        status: 'success',
        message: 'Hello from Server'
    })
})

app.get('/create-pdf', (req, res) => {
    const create_blank = async() => {
        const doc = await PDFNet.PDFDoc.create();
        const page = await doc.pageCreate();
        doc.pagePushBack(page);
        doc.save('blank.pdf', PDFNet.SDFDoc.SaveOptions.e_linearized);
    }
    PDFNet.runWithCleanup(create_blank, process.env.LICENSE_KEY).then(() => {
        fs.readFile(outputPath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end(err);
            } else {
                res.setHeader('Content-Type', 'application/pdf');
                res.end(data);
            }
        })
    }).catch((err) => {
        res.statusCode = 500;
        res.end(err);
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})