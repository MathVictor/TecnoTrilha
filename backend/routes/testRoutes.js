const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/perguntas', testController.getQuestions);

module.exports = router;
