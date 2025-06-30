//Import para usar o mongo
const mongoose = require('mongoose');

//Schema para pegar o conteúdo a ser colocado no site no mongo
const contentSchema = new mongoose.Schema({
	titulo: String,
	descricao: String,
	tipo: { type: String, enum: ['curso', 'perfil', 'desafio'] },
	link: String,
});

module.exports = mongoose.model('Content', contentSchema);
