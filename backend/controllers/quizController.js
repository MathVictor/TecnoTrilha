const fs = require('fs');
const path = require('path');

const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions.json')));

exports.getPergunta = (req, res) => {
  const progresso = req.session.quiz || { atual: 0, respostas: [], pontos: {} };
  const pergunta = questions[progresso.atual];
  if (!pergunta) return res.json({ fim: true, pontos: progresso.pontos });

  res.json({ pergunta });
};

exports.responder = (req, res) => {
  const { index } = req.body;
  const quiz = req.session.quiz || { atual: 0, respostas: [], pontos: {} };
  const pergunta = questions[quiz.atual];

  if (!pergunta) return res.status(400).json({ erro: 'Pergunta inválida' });

  const opcao = pergunta.opcoes[index];
  if (!opcao) return res.status(400).json({ erro: 'Opção inválida' });

  // Acumula pontuação
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

exports.resetar = (req, res) => {
  req.session.quiz = { atual: 0, respostas: [], pontos: {} };
  res.json({ resetado: true });
};
