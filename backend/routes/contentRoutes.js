// backend/routes/contentRoutes.js
const express = require('express');
const router = express.Router();

const { getConteudos } = require('../controllers/contentController');

router.get('/', getConteudos);

module.exports = router;
