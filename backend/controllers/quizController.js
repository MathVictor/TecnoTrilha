const fs = require('fs');
const path = require('path');
const User = require('../models/User');

// Carrega perguntas do JSON
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions.json')));

// Puxar próxima pergunta
exports.getPergunta = (req, res) => {
	const progresso = req.session.quiz || { atual: 0, respostas: [], pontos: {} };
	const pergunta = questions[progresso.atual];
	if (!pergunta) return res.json({ fim: true, pontos: progresso.pontos });

	res.json({ pergunta });
};

// Resposta ao usuário
exports.responder = (req, res) => {
	const { index } = req.body;
	const quiz = req.session.quiz || { atual: 0, respostas: [], pontos: {} };
	const pergunta = questions[quiz.atual];

	if (!pergunta) return res.status(400).json({ erro: 'Pergunta inválida' });

	const opcao = pergunta.opcoes[index];
	if (!opcao) return res.status(400).json({ erro: 'Opção inválida' });

	// Lógica de pontuação por área
	for (let area in opcao.pontuacao) {
		quiz.pontos[area] = (quiz.pontos[area] || 0) + opcao.pontuacao[area];
	}

	quiz.atual++;
	req.session.quiz = quiz;

	if (quiz.atual >= questions.length) {
		return res.json({ fim: true, pontos: quiz.pontos });
	}

	res.json({ sucesso: true });
};

// Reset do progresso
exports.resetar = (req, res) => {
	req.session.quiz = { atual: 0, respostas: [], pontos: {} };
	res.json({ resetado: true });
};

// Salva o perfil vocacional no MongoDB
exports.salvarResultado = async (req, res) => {
	if (!req.session.user) {
		return res.status(401).json({ erro: 'Não autenticado' });
	}

	const pontuacoes = req.session.quiz?.pontos || {};
	const perfilMaisForte = Object.entries(pontuacoes).sort((a, b) => b[1] - a[1])[0]?.[0];

	if (!perfilMaisForte) {
		return res.status(400).json({ erro: 'Perfil não identificado' });
	}

	try {
		await User.findByIdAndUpdate(req.session.user._id, {
			perfilVocacional: perfilMaisForte
		});

		res.json({ sucesso: true, perfil: perfilMaisForte });
	} catch (err) {
		console.error('Erro ao salvar perfil:', err);
		res.status(500).json({ erro: 'Erro ao salvar perfil' });
	}
};
