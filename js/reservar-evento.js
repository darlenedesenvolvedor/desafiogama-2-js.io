const BASE_URL = "https://soundgarden-api.vercel.app/events";

// Obtém uma referência para o elemento <main> do documento HTML
const main = document.querySelector("main");

// Função para exibir o modal de reserva
function showReservationModal(eventId) {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";

  // Salva o ID do evento para usar na reserva
  idReserva = eventId;
}

// Função para fechar o modal de reserva
function hideReservationModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
}

// Template do modal de reserva
const reservationModalTemplate = `
  <div class="modal">
    <form class="modal-content" onsubmit="return validateForm(event)">
      <div class="container">
        <h1>Reservar Ingresso</h1>
        <p>Por favor, preencha esse formulário para reservar seu ingresso.</p>
        <hr>
        <label for="name"><b>Nome</b></label>
        <input id="name" type="text" placeholder="Digite seu nome" name="name" required>
        <label for="email"><b>Email</b></label>
        <input id="email" type="text" placeholder="Digite seu Email" name="email" required>
        <div class="botao">
          <button type="button" onclick="hideReservationModal()" class="cancel">X</button>
          <button type="submit" class="res">Reservar</button>
        </div>
      </div>
    </form>
  </div>
`;

// Adiciona o modal de reserva ao <main> do documento HTML
main.innerHTML += reservationModalTemplate;

// Obtém uma referência para o formulário de reserva
const reservationForm = document.querySelector(".modal-content");

// Função para validar o formulário de reserva
function validateForm(event) {
  event.preventDefault();
  
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;

  // Validar nome e email
  if (!name || !email) {
    alert("Por favor, preencha seu nome e email para continuar.");
    return false;
  }

  bookEventTickets(name, email, idReserva);
  hideReservationModal();
  return true;
}

// Função para reservar ingressos em um evento
async function bookEventTickets(name, email, eventId) {
  try {
    const requestBody = {
      owner_name: name,
      owner_email: email,
      number_tickets: 1,
      event_id: eventId,
    };

    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      alert("Ingresso reservado com sucesso!");
    } else {
      throw new Error("Erro ao reservar ingresso.");
    }
  } catch (error) {
    console.error(error);
    alert("Ocorreu um erro inesperado. Tente novamente, por favor.");
  }
}
