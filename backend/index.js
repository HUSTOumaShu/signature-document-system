const {PDFNet} = require('@pdftron/pdfnet-node');
const express = require('express')
const path = require('path')
const fs = require('fs');
require('dotenv').config()

const app = express()

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