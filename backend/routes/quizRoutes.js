const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/resetar', quizController.resetar);
router.get('/pergunta', quizController.getPergunta);
router.post('/responder', quizController.responder);
router.post('/salvar-perfil', quizController.salvarResultado);

module.exports = router;
