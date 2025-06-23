// src/services/productService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Altere para a URL do seu backend

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product`);
    return response.data; // Retorna a lista de produtos
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error; // Lança o erro para ser tratado onde a função é chamada
  }
};