document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
});
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/usuario/perfil', {
      method: 'GET',
      credentials: 'include'
    });

    const data = await res.json();

    if (data.erro) {
      console.warn('Não autenticado ou erro ao buscar perfil.');
      return;
    }

    document.getElementById('user-nome').textContent = data.nome || 'Desconhecido';
    document.getElementById('user-email').textContent = data.email || 'Desconhecido';
    document.getElementById('user-perfil').textContent = data.perfil || 'Não definido';

  } catch (err) {
    console.error('Erro ao carregar dados do usuário:', err);
  }
});
