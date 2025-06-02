//Rotas do BD e de encriptação de senha
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Cria o schema de usuários para inserir no mongo 
const userSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  role: { type: String, enum: ['jogador', 'admin'], default: 'jogador' }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);