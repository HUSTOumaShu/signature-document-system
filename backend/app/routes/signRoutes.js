const express = require('express');
const {signData} = require('../controllers/signController');

const router = express.Router();
router.post('/signData', signData);

module.exports = router;