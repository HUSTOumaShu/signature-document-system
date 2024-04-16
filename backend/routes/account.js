const express = require('express');
const AccountController = require('../app/controllers/AccountController.js');
const protect = require('../app/middleware/authMiddleware.js');
const router = express.Router();

router.post('/register', AccountController.register);
router.post('/login', AccountController.login);
router.get('/profile').get(protect, AccountController.getProfile)

module.exports = router;