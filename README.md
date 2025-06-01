# TecnoTrilha
Projeto para a matéria Certificadora de Competência 3 da UTFPR. **TecnoTrilha** é uma aplicação web interativa e gamificada que busca inspirar meninas do Ensino Fundamental II e Ensino Médio a explorarem caminhos acadêmicos e profissionais nas áreas de tecnologia e engenharia.

Este projeto é uma iniciativa do grupo **Meninas Digitais UTFPR-CP**, com o objetivo de tornar o autoconhecimento uma experiência leve, divertida e transformadora, por meio de um teste vocacional personalizado e conteúdos educacionais acessíveis.


#  Membros

- João Pedro Madureira Sales
- Matheus Victor Martins
- Tom Otsuki
- Yuri Silvestre Admertides


## Funcionalidades

-  Teste vocacional gamificado (perguntas leves e direcionadas).
-  Cálculo de perfil com base em trilhas tecnológicas.
-  Conteúdo complementar: perfis inspiradores, cursos gratuitos e atividades práticas.
-  Interface acessível e inclusiva.
-  Área administrativa para gestão de jogadoras, postagens e módulos.

---

##  Tecnologias Utilizadas

### 🖥️ Front-End
- HTML5, CSS3, JavaScript
- Design responsivo
- Animações leves e experiência fluida

### ⚙️ Back-End
- Node.js + Express
- MongoDB com Mongoose
- Sessões com connect-mongo
- Middleware de autenticação

### 🛠️ Infraestrutura
- Git + GitHub (controle de versão)
- Google Drive + Docs (documentação colaborativa)
- Discord e WhatsApp (comunicação da equipe)
- Notion (gerenciamento de tarefas)

---

## 🧩 Estrutura do Projeto
tecnotrilha/
├── backend/
│ ├── app.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── config/
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── quiz.html
│ ├── resultado.html
│ └── assets/
│ ├── css/
│ └── js/
├── public/
│ └── ...
├── README.md
└── package.json


---

## 👩‍🎓 Público-Alvo

- Meninas do Ensino Fundamental II e Ensino Médio
- Público geral interessado em se orientar profissionalmente nas áreas STEM

---

## 🧠 Como Rodar o Projeto

### 1. Clone o repositório

``
bash
git clone https://github.com/seu-usuario/tecnotrilha.git
cd tecnotrilha
``
2. Instale as dependências
``
npm install
``
4. Crie um arquivo .env
``
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/main
``
6. Rode o servidor
``
npm run dev
Acesse o app em: http://localhost:3000
``
