const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const user = new User({ nome, email, senha });
    await user.save();
    res.redirect('/login.html');
  } catch (error) {
    res.status(400).send('Erro ao registrar usuário');
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send('Credenciais inválidas');

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(401).send('Senha incorreta');

  req.session.user = {
    id: user._id,
    email: user.email,
    role: user.role
  };

  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login.html');
  });
};
