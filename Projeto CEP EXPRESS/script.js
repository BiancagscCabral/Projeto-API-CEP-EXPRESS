//variáveis 
const cepInput = document.getElementById('cepInput');
const searchBtn = document.getElementById('searchBtn');
const resultBox = document.getElementById('result');
const errorMessage = document.getElementById('errorMessage');

const ruaEl = document.getElementById('rua');
const bairroEl = document.getElementById('bairro');
const cidadeEl = document.getElementById('cidade');
const estadoEl = document.getElementById('estado');


//pra exibir o resultado
function exibirResultado(dados) {
    
    ruaEl.textContent = dados.street;
    bairroEl.textContent = dados.neighborhood;
    cidadeEl.textContent = dados.city;
    estadoEl.textContent = dados.state;


// para ficar visivel
    resultBox.style.display = 'block';
    errorMessage.style.display = 'none';
}


//função de exibir erro se digitar errado
function exibirErro(mensagem) {
   
    errorMessage.textContent = mensagem;

    // Mostra a caixa de erro
    errorMessage.style.display = 'block';
    resultBox.style.display = 'none';
}

//principal função
async function consultarCep() {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        exibirErro("Por favor, digite um CEP válido.");
        return;
    }

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);

        if (!response.ok) {
            throw new Error('CEP não encontrado ou inválido.');
        }

        const data = await response.json();
        
        exibirResultado(data);

    } catch (error) {
        // erro msg
        exibirErro(error.menssage);
    }
}
searchBtn.addEventListener('click', consultarCep);