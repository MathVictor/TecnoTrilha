//Import para mexer com arquivos e caminhos
const fs = require('fs');
const path = require('path');

//Pega as questões do JSON
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/questions.json')));

//Func para pegar uma pergunta do BD
exports.getPergunta = (req, res) => {
  const progresso = req.session.quiz || { atual: 0, respostas: [], pontos: {} };
  const pergunta = questions[progresso.atual];
  if (!pergunta) return res.json({ fim: true, pontos: progresso.pontos });

  res.json({ pergunta });
};

//Func para responder uma pergunta e adicionar pontuação de usuários
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

//Func para resetar a pontuação do quiz
exports.resetar = (req, res) => {
  req.session.quiz = { atual: 0, respostas: [], pontos: {} };
  res.json({ resetado: true });
};
