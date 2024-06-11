const Otps = require('../models/otpModel');
const randomstring = require('randomstring');
const sendEmail = require('../../utils/sendEmail');

// Generate OTP
function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}

// Send OTP
exports.sendOTP = async (req, res, next) => {
    try {
        const otp = generateOTP();
        const {email} = req.body;
        const newOtp = new Otps({email, otp});
        await newOtp.save();
        // Send OTP to email
        await sendEmail({
            email,
            subject: 'OTP for Email Verification to sign document',
            message: `<p>Your OTP is <strong>${otp}</strong></p>`
        });
        res.json({success: true, message: 'OTP sent successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

// Verify OTP
exports.verifyOTP = async (req, res, next) => {
    try {
        const {email, otp} = req.body;
        const existingOTP = await Otps.findOneAndDelete({email, otp});
        if(!existingOTP) {
            return res.status(400).json({success: false, message: 'Invalid OTP'});
        } else {
            res.status(200).json({success: true, message: 'OTP verified successfully'});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}