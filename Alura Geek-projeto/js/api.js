const API_URL = "http://localhost:3000/produtos";

// Função para realizar requisição GET
export async function obterProdutos() {
  try {
    const response = await fetch(API_URL); // Faz requisição 
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`); // status de erro
    }
    return await response.json(); // Retorna os dados em formato JSON
  } catch (error) {
    console.error("Erro ao obter os produtos:", error);
    throw error; 
  }
}

// Função para realizar requisição POST e criar um novo produto
export async function criarProduto(novoProduto) {
  try {
    const response = await fetch(API_URL, {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      },
      body: JSON.stringify(novoProduto), // Converte o objeto JavaScript em uma string JSON
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar o produto: ${response.status}`);
    }

    return await response.json(); // Retorna o produto recém-criado
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    throw error; // Retorna o erro para ser tratado na função que chamou
  }
}
