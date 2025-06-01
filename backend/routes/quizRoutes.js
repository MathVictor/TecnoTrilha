//Imports para roteamento
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//Vars para controlar o progresso do quiz
let perguntas = [];
let progresso = 0;
let pontuacoes = {};


//Func que reinicia as vars do quiz
const resetarQuiz = () => {
  const filePath = path.join(__dirname, '../data/questions.json');
  perguntas = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  progresso = 0;
  pontuacoes = {};
};

//Rota para reiniciar o quiz
router.post('/resetar', (req, res) => {
  resetarQuiz();
  res.json({ ok: true });
});

//Rota que controla o o fluxo do quiz, verificando se já foi concluido ou não
router.get('/pergunta', (req, res) => {
  if (progresso >= perguntas.length) {
    return res.json({ fim: true, pontos: pontuacoes });
  }

  const perguntaAtual = perguntas[progresso];
  res.json({ pergunta: perguntaAtual });
});

//Rota que controla o progresso feito no quiz e adiciona a pontuação ao usuário
router.post('/responder', (req, res) => {
  const { index } = req.body;
  const resposta = perguntas[progresso].opcoes[index];

  for (let area in resposta.pontuacao) {
    pontuacoes[area] = (pontuacoes[area] || 0) + resposta.pontuacao[area];
  }

  progresso++;
  res.json({ ok: true });
});

//Rota que obtém a pergunta do JSON
router.get('/pergunta', (req, res) => {
  console.log("Enviando pergunta:", perguntas[progresso]); // debug
  if (progresso >= perguntas.length) {
    return res.json({ fim: true, pontos: pontuacoes });
  }
  res.json({ pergunta: perguntas[progresso] });
});


module.exports = router;
