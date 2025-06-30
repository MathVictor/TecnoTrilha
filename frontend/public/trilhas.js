document.addEventListener('DOMContentLoaded', async () => {
  const perfilEl = document.getElementById('perfil-detectado');
  const container = document.getElementById('trilhas-container');

  const nomesPerfil = {
    comunicacao: 'Comunicadora',
    dados: 'Analista de Dados',
    design: 'Designer Criativa',
    programacao: 'Desenvolvedora Web',
    engenharia: 'Engenheira de Software',
    redes: 'Especialista em Redes'
  };

  const trilhas = {
    programacao: [
      { titulo: 'HTML + CSS', descricao: 'Fundamentos da Web', link: 'https://developer.mozilla.org/pt-BR/docs/Web' },
      { titulo: 'JavaScript', descricao: 'Linguagem essencial para web', link: 'https://javascript.info/' },
      { titulo: 'Git & GitHub', descricao: 'Controle de versão', link: 'https://www.git-scm.com/' }
    ],
    dados: [
      { titulo: 'Python Básico', descricao: 'Comece com dados', link: 'https://www.python.org/doc/' },
      { titulo: 'Pandas e NumPy', descricao: 'Manipule tabelas e arrays', link: 'https://pandas.pydata.org/' }
    ],
    engenharia: [
      { titulo: 'Arduino', descricao: 'Controle de hardware', link: 'https://www.arduino.cc/en/Tutorial/HomePage' },
      { titulo: 'Lógica Digital', descricao: 'Base para eletrônicos', link: 'https://www.electronics-tutorials.ws/' }
    ],
    design: [
      { titulo: 'Figma', descricao: 'Design de Interfaces', link: 'https://figma.com' },
      { titulo: 'UX Writing', descricao: 'Texto para produtos', link: 'https://uxwritinghub.com/' }
    ],
    comunicacao: [
      { titulo: 'Storytelling', descricao: 'Comunicar com impacto', link: 'https://medium.com/tag/storytelling' },
      { titulo: 'Marketing Digital', descricao: 'Divulgação e alcance', link: 'https://rockcontent.com/br/blog/marketing-digital/' }
    ],
    redes: [
      { titulo: 'Redes de Computadores', descricao: 'Como os sistemas se conectam', link: 'https://www.cisco.com/' },
      { titulo: 'Segurança da Informação', descricao: 'Proteja sistemas', link: 'https://www.kaspersky.com.br/resource-center' }
    ]
  };

  try {
    const res = await fetch('/api/usuario/perfil', {
      method: 'GET',
      credentials: 'include'
    });

    const data = await res.json();
    const perfil = data.perfil?.toLowerCase();

    if (!perfil || data.erro) {
      perfilEl.textContent = 'Não identificado';
      container.innerHTML = '<p>Você precisa completar o teste vocacional para ver suas trilhas.</p>';
      return;
    }

    perfilEl.textContent = nomesPerfil[perfil] || perfil;

    const cards = trilhas[perfil] || [];

    if (cards.length === 0) {
      container.innerHTML = '<p>Nenhuma trilha disponível para esse perfil.</p>';
      return;
    }

    cards.forEach((trilha, i) => {
      const card = document.createElement('div');
      card.className = 'trilha-card animate';
      card.innerHTML = `
        <h3>${trilha.titulo}</h3>
        <p>${trilha.descricao}</p>
        <a class="btn" href="${trilha.link}" target="_blank" rel="noopener noreferrer">Acessar</a>
      `;
      container.appendChild(card);

      setTimeout(() => {
        card.classList.add('in-view');
      }, 100 * i);
    });

  } catch (err) {
    console.error('Erro ao carregar trilhas:', err);
    perfilEl.textContent = 'Erro';
    container.innerHTML = '<p>Erro ao carregar trilhas.</p>';
  }
});
