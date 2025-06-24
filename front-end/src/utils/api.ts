import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Substitua pelo endereço correto do back-end
});

// Adiciona o token no cabeçalho de todas as requisições, se disponível
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;