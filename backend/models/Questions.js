const mongoose = require('mongoose');

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
