//Imports para roteamento
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

//Rota para testes das perguntas
router.get('/perguntas', testController.getQuestions);

module.exports = router;
