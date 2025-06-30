exports.requireLogin = (req, res, next) => {
	if (req.session && req.session.user) {
		return next(); // Usuário autenticado, prossiga
	}
	// Redireciona para login se não estiver logado
	res.redirect('/login.html');
};
