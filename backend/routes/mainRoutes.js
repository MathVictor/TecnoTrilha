//Imports para roteamento
const express = require('express');
const path = require('path');
const router = express.Router();

//Redireciona para a homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

module.exports = router;
