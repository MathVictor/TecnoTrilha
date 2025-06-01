//Pegando o modelo de conteúdo
const Content = require('../models/Content');

//Colocando o conteúdo na página a partir do BD
const getConteudos = async (req, res) => {
  try {
    const conteudos = await Content.find();
    res.json(conteudos);
  } catch (err) {
    console.error('Erro ao buscar conteúdos:', err);
    res.status(500).json({ erro: 'Erro ao buscar conteúdos' });
  }
};

module.exports = { getConteudos };
