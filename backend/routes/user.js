const express = require('express');
const router = express.Router();
const protect = require('../app/middleware/authMiddleware');
const UserController = require('../app/controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile').get(protect, UserController.getProfile)
router.get('/list', UserController.showAll);
router.post('/store', UserController.store);

module.exports = router;