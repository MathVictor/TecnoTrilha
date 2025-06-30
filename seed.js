require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('./backend/models/Content');

const dados = [
  {
    titulo: "Curso HTML para Iniciantes",
    descricao: "Aprenda HTML com exercícios práticos.",
    tipo: "curso",
    link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML"
  },
  {
    titulo: "Perfil: Ada Lovelace",
    descricao: "Primeira programadora da história.",
    tipo: "perfil",
    link: "https://pt.wikipedia.org/wiki/Ada_Lovelace"
  },
  {
    titulo: "Desafio: Crie uma página pessoal",
    descricao: "Faça um site simples com HTML e CSS.",
    tipo: "desafio",
    link: "https://www.w3schools.com/html/html_examples.asp"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Content.deleteMany({});
    await Content.insertMany(dados);
    console.log('Conteúdos inseridos no banco main');
    process.exit();
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

