const express = require('express');
const router = express.Router();
const { recomendarTrilhas } = require('../controllers/trilhaController');
const { requireLogin } = require('../middleware/authMiddleware');

router.get('/trilhas', requireLogin, recomendarTrilhas);

module.exports = router;
