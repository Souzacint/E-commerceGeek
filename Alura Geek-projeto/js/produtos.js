import { obterProdutos } from "./api.js";

// Constante para a URL base da API
const API_BASE_URL = "http://localhost:3000/produtos";

// Função responsável por criar dinamicamente os cards
function criarCardProduto(produto) {
  return `
    <div class="produto-card" id="produto-${produto.id}">
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="card-container--info">
        <p class="produto-nome">${produto.nome}</p>
        <div class="card-container--value">
          <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
        </div>
        <button class="excluir-produto">Excluir</button>
      </div>
    </div>
  `;
}

// Função para listar produtos dinamicamente
function listarProdutos(produtos) {
  const container = document.querySelector("[data-produtos-container]"); // Seleciona o container
  container.innerHTML = ""; // Limpa o conteúdo anterior

  // Verifica se há produtos
  if (produtos.length === 0) {
    document.querySelector(".nenhum-produto").style.display = "block"; // Mostra a mensagem "Nenhum produto"
  } else {
    document.querySelector(".nenhum-produto").style.display = "none"; // Esconde a mensagem

    // Itera sobre os produtos e renderiza cada um
    produtos.forEach(produto => {
      const cardHTML = criarCardProduto(produto); // Gera o HTML do card
      container.insertAdjacentHTML("beforeend", cardHTML); // Adiciona o card ao container

      // Adiciona o evento de exclusão ao botão de cada card
      const btnExcluir = document.querySelector(`#produto-${produto.id} .excluir-produto`);
      btnExcluir.addEventListener("click", () => excluirProduto(produto.id));
    });
  }
}

// Função para carregar produtos da API
async function carregarProdutos() {
  try {
    const response = await fetch(API_BASE_URL); // Faz requisição para a API
    const produtos = await response.json();
    listarProdutos(produtos); // Exibe os produtos dinamicamente
  } catch (error) {
    console.error("Erro ao carregar os produtos:", error);
    const listaProdutos = document.querySelector("[data-produtos-container]");
    listaProdutos.innerHTML = "<p class='erro'>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>";
  }
}

// Função para adicionar um novo produto à API
async function adicionarProduto(produto) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produto),
    });
    if (response.ok) {
      const produtoAdicionado = await response.json(); // Recebe o produto adicionado

      // Adiciona o card do novo produto na interface
      const container = document.querySelector("[data-produtos-container]");
      const cardHTML = criarCardProduto(produtoAdicionado);
      container.insertAdjacentHTML("beforeend", cardHTML);
    }
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
  }
}

// Função para excluir produto da API
async function excluirProduto(id) {
  try {
    if (confirm("Deseja mesmo excluir este produto?")) {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remover apenas o card do produto excluído
        document.getElementById(`produto-${id}`).remove();
      }
    }
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
  }
}

// Função para capturar dados do formulário de novo produto e chamar a função adicionarProduto
function capturarDadosFormulario() {
  const nome = document.querySelector("#nomeProduto").value;
  const imagem = document.querySelector("#imagemProduto").value;
  const preco = parseFloat(document.querySelector("#precoProduto").value);

  // Verificação básica para garantir que os campos estão preenchidos
  if (!nome || !imagem || isNaN(preco)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const novoProduto = { nome, imagem, preco };
  adicionarProduto(novoProduto); // Chama a função para adicionar o produto
}

// Adicionando evento para o formulário de novo produto
const formularioProduto = document.querySelector("#formProduto");
if (formularioProduto) {
  formularioProduto.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário
    capturarDadosFormulario(); // Captura os dados e adiciona o produto
  });
}

// Carrega os produtos ao iniciar a página
carregarProdutos();
