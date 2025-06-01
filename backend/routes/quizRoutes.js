const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

let perguntas = [];
let progresso = 0;
let pontuacoes = {};

const resetarQuiz = () => {
  const filePath = path.join(__dirname, '../data/questions.json');
  perguntas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  progresso = 0;
  pontuacoes = {};
};

router.post('/resetar', (req, res) => {
  resetarQuiz();
  res.json({ ok: true });
});

router.get('/pergunta', (req, res) => {
  if (progresso >= perguntas.length) {
    return res.json({ fim: true, pontos: pontuacoes });
  }

  const perguntaAtual = perguntas[progresso];
  res.json({ pergunta: perguntaAtual });
});

router.post('/responder', (req, res) => {
  const { index } = req.body;
  const resposta = perguntas[progresso].opcoes[index];

  for (let area in resposta.pontuacao) {
    pontuacoes[area] = (pontuacoes[area] || 0) + resposta.pontuacao[area];
  }

  progresso++;
  res.json({ ok: true });
});
router.get('/pergunta', (req, res) => {
  console.log("Enviando pergunta:", perguntas[progresso]); // debug
  if (progresso >= perguntas.length) {
    return res.json({ fim: true, pontos: pontuacoes });
  }
  res.json({ pergunta: perguntas[progresso] });
});


module.exports = router;
