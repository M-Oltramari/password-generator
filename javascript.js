// Seleciona elementos do DOM
const button = document.querySelector('#button');
const result = document.querySelector('#result');
const copied = document.querySelector("#copied");
const copyButton = document.querySelector("#copyButton");

// Define símbolos especiais para a senha
const symbol = ['@','!','*', '$'];
let password = '';

// Função para gerar uma senha
function generatePass() {
  // Seleciona dois símbolos aleatórios do array
  const randomSymbol = Math.floor(Math.random() * symbol.length);
  const randomSymbol2 = Math.floor(Math.random() * symbol.length);

  // Obtém o valor do input e remove espaços em branco
  let input = document.querySelector('#input').value.toLowerCase().replace(/\s/g, '');

  // Obtém checkboxes para substituir letras por números e usar letras maiúsculas
  const letterToNumberCheck = document.querySelector('#letterToNumber');
  const upperCaseCheck = document.querySelector('#enableUpperCase');
  let number = -2; // Usado para pegar parte do número gerado aleatoriamente

  // Verifica se o input não está vazio
  if(input.length > 0) {
    // Se o checkbox para substituir letras por números estiver marcado, faz a substituição
    if (letterToNumberCheck.checked === true) {
      input = input.replace(/a/gi, 4).replace(/i/gi, 1).replace(/o/gi, 0);
    }

    // Se o checkbox para letras maiúsculas estiver marcado, randomiza entre maiúsculas e minúsculas
    if (upperCaseCheck.checked) {
      input = input.split('').map((v) =>
        Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
      ).join('');
    }

    // Gera a senha combinando símbolos, input modificado e um número aleatório
    password = symbol[randomSymbol] + input + symbol[randomSymbol2] + Math.random().toString(32).slice(number);
    result.innerHTML = password; // Exibe a senha no elemento de resultado

    // Exibe o botão de copiar e define um tempo para escondê-lo novamente
    copyButton.classList.add("--display");
    setTimeout(function () {
      result.innerHTML = ''; 
      copyButton.classList.remove("--display");
    }, 70000); // 70 segundos
  }
}

// Função para copiar a senha gerada para a área de transferência
function copyResult() {
  // Cria um elemento textarea temporário para copiar o texto
  const textArea = document.createElement("textarea");
  textArea.value = password; // Define o valor do textarea como a senha gerada
  document.body.appendChild(textArea); // Adiciona o textarea ao corpo do documento
  textArea.select(); // Seleciona o conteúdo do textarea
  document.execCommand("copy"); // Copia o conteúdo selecionado para a área de transferência
  textArea.remove(); // Remove o textarea do DOM

  // Exibe uma mensagem de "copiado" e a remove após 2.5 segundos
  copied.classList.add("--show");
  setTimeout(function() { copied.classList.remove("--show"); }, 2500);
}
