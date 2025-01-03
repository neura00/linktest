// Obter elementos do DOM
const consentPopup = document.getElementById('consent-popup');
const acceptBtn = document.getElementById('accept-btn');
const declineBtn = document.getElementById('decline-btn');
const dataLink = document.getElementById('data-link');

// Função para coletar dados de localização do usuário
function collectUserData() {
    const userData = {
        location: null,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        cookies: document.cookie
    };

    // Tentar capturar a localização, se permitido
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            userData.location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            console.log("Localização coletada:", userData.location);
            sendUserData(userData); // Envia os dados para o servidor
        });
    } else {
        // Caso a geolocalização não seja permitida
        sendUserData(userData);
    }
}

// Função para enviar dados para o servidor (exemplo com fetch)
function sendUserData(data) {
    fetch('https://seu-servidor.com/api/coleta', { // Substitua com seu servidor real
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log('Dados enviados com sucesso:', data))
    .catch(error => console.error('Erro ao enviar dados:', error));
}

// Exibir o pop-up de consentimento ao clicar no link
dataLink.addEventListener('click', (event) => {
    event.preventDefault();  // Evita o comportamento padrão do link
    consentPopup.style.display = 'flex';  // Exibe o pop-up
});

// Se o usuário aceitar, coletar e enviar os dados
acceptBtn.addEventListener('click', () => {
    consentPopup.style.display = 'none';  // Fechar o pop-up
    collectUserData();  // Coletar os dados
});

// Se o usuário recusar, fechar o pop-up sem coletar dados
declineBtn.addEventListener('click', () => {
    consentPopup.style.display = 'none';  // Fechar o pop-up
});
