const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireLogin } = require('../middleware/authMiddleware');

router.get('/usuario/perfil', requireLogin, async (req, res) => {

	try {

		const usuario = await User.findById(req.session.user._id);

		if (!usuario) {
			return res.status(404).json({ erro: 'Usuário não encontrado' });
		}

		res.json({
			nome: usuario.nome,
			email: usuario.email,
			perfil: usuario.perfilVocacional || 'Não definido'
		});

	} catch (err) {
		console.error('Erro ao buscar perfil:', err);
		res.status(500).json({ erro: 'Erro interno' });
	}
	
});

module.exports = router;
