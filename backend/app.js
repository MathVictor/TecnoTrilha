require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const userRoutes 	= require('./routes/userRoutes');
const trilhaRoutes 	= require('./routes/trilhaRoutes');
const authRoutes 	= require('./routes/authRoutes');
const quizRoutes 	= require('./routes/quizRoutes');
const { requireLogin } = require('./middleware/authMiddleware');

const PORT = process.env.PORT || 3000;
const app = express();

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log("Conectado ao MongoDB"))
	.catch(err => console.error("Erro ao conectar no MongoDB:", err));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(session({
	secret: process.env.SESSION_SECRET || 'fallback-secret',
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),

	cookie: {
		httpOnly: true,
		secure: false,
		sameSite: 'lax'
	}	
}));
	
app.use('/api', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api', userRoutes); 
app.use('/api', trilhaRoutes);

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/dashboard', requireLogin, (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/public/dashboard.html'));
});

app.get('/teste.html', requireLogin, (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/public/teste.html'));
});

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/trilhas.html', requireLogin, (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/public/trilhas.html'));
});