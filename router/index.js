const express = require('express');
const { registerController, validateController } = require('../controllers/totpauth.controller');

const router = express.Router();

router.post('/register', registerController);
router.post('/validate', validateController);

module.exports = router;
