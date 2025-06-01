require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🧠 Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar no MongoDB:", err));

// Middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔐 Sessão armazenada no MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}));

// ⬆️ Importação de rotas
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const { requireLogin } = require('./middleware/authMiddleware');

// 🧭 ROTAS da API
app.use('/api', authRoutes);       // auth (login, register)
app.use('/api/quiz', quizRoutes);  // quiz (resetar, pergunta, responder)

// 🌐 Arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// 🔒 Painel protegido
app.get('/dashboard', requireLogin, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/dashboard.html'));
});

// 🧪 Rota do teste (acessível via index.html → teste.html)
app.get('/teste.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/teste.html'));
});

// ▶️ Inicializa servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
