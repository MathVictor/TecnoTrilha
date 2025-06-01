module.exports = {
  requireLogin: (req, res, next) => {
    if (!req.session.user) return res.redirect('/login.html');
    next();
  },

  requireAdmin: (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).send('Acesso negado');
    }
    next();
  }
};
