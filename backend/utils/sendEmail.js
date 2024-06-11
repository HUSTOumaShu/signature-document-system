const expressAsyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();

const sendEmail = expressAsyncHandler(async options => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: options.email,
        subject: options.subject,
        html: options.message
    };
    await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;