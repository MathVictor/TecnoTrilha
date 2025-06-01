//Import para o usar o mongo
const mongoose = require('mongoose');

//Cria o schema de questão para inserir no mongo
const questionSchema = new mongoose.Schema({
  texto: String,
  opcoes: [
    {
      texto: String,
      peso: {
        logica: Number,
        criatividade: Number,
        comunicacao: Number,
        design: Number
      }
    }
  ]
});

module.exports = mongoose.model('Question', questionSchema);
