const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/UserController');

router.get('/', UserController.showAll);
router.get('/:uid', UserController.show);
router.post('/store', UserController.store);

module.exports = router;