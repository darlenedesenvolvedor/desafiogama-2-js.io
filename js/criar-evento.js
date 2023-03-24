// Selecionando elementos do formulário
const form = document.querySelector('form');
const nomeInput = document.querySelector('#nome');
const bannerInput = document.querySelector('#banner');
const atracoesInput = document.querySelector('#atracoes');
const descricaoInput = document.querySelector('#descricao');
const dataInput = document.querySelector('#data');
const lotacaoInput = document.querySelector('#lotacao');

// Configurando campo de descrição
descricaoInput.setAttribute('maxlength', '300');
descricaoInput.setAttribute('style', 'resize:none');

// Função para enviar dados do formulário
function submitForm(event) {
  event.preventDefault();

  // Criando objeto com os dados do formulário
  const formData = {
    name: nomeInput.value,
    poster: bannerInput.value,
    attractions: atracoesInput.value.split(', '),
    description: descricaoInput.value,
    scheduled: new Date(dataInput.value).toISOString(),
    number_tickets: lotacaoInput.value
  };

  // Fazendo requisição POST para a API
  fetch('https://soundgarden-api.vercel.app/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Não foi possível cadastrar o evento.');
    }
  })
  .then(data => {
    alert('Evento cadastrado com sucesso!');
    window.location.replace('./admin.html');
  })
  .catch(error => {
    alert(error.message);
  });
}

// Adicionando evento de submit ao formulário
form.addEventListener('submit', submitForm);
