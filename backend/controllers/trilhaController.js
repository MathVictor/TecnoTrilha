const trilhasData = require('../data/trilhas.json');
const User = require('../models/User');

exports.recomendarTrilhas = async (req, res) => {
	try {

		const usuario = await User.findById(req.session.user._id);
		
		if (!usuario || !usuario.perfilVocacional) return res.status(400).json({ erro: 'Perfil vocacional não definido' });

		const perfil = usuario.perfilVocacional.toLowerCase();
		const trilhas = trilhasData[perfil] || [];

		res.json({ perfil, trilhas });

	} catch (err) {
		console.error('Erro ao recomendar trilhas:', err);
		res.status(500).json({ erro: 'Erro ao buscar trilhas' });
	}
};
