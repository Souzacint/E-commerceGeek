import { adicionarProduto } from "./produtos.js"; // Importa a função para adicionar produtos

// Função para capturar o formulário e os dados
function init() {
  const formulario = document.querySelector("#form-produto"); // Seleciona o formulário
  formulario.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário (que é recarregar a página)

    // Captura os valores dos inputs
    const nomeProduto = document.querySelector("#nome-produto").value;
    const precoProduto = parseFloat(document.querySelector("#preco-produto").value);
    const imagemProduto = document.querySelector("#imagem-produto").value;

    // Cria um objeto com os dados do novo produto
    const novoProduto = {
      nome: nomeProduto,
      preco: precoProduto,
      imagem: imagemProduto,
    };

    // Chama a função para adicionar o produto
    adicionarProduto(novoProduto);

    // Limpa o formulário após a submissão
    formulario.reset();
  });
}

// Chama a função init para configurar o listener de eventos
init();
