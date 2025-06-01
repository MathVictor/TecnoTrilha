//Imports para roteamento
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

//Rotas básicas de CRUD(login, cadastro, logout)
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

module.exports = router;
