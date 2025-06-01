// backend/models/Content.js
const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  tipo: { type: String, enum: ['curso', 'perfil', 'desafio'] },
  link: String,
});

module.exports = mongoose.model('Content', contentSchema);
