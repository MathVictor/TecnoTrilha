//Imports para roteamento
const express = require('express');
const router = express.Router();

//Pega os conteúdos puxados do BD para colocar na página
const { getConteudos } = require('../controllers/contentController');

//Rota para colocar os conteúdos
router.get('/', getConteudos);

module.exports = router;
