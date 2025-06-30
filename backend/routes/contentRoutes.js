const express = require('express');
const router = express.Router();

// Módulo para obter conteúdos
const { getConteudos } = require('../controllers/contentController');

//Rota de Conteúdos
router.get('/', getConteudos);

module.exports = router;
