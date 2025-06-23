import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css'; 


const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const validateEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    const validateCPF = (cpf: string) => {
      const cleaned = cpf.replace(/\D/g, "");
      return cleaned.length === 11;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
  
      // Validações
      if (!name || !email || !document || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
      }
  
      if (!validateEmail(email)) {
        setError('E-mail inválido.');
        return;
      }

      if (!validateCPF(document)) {
        setError('CPF inválido.');
        return;
      }

       const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!senhaValida.test(password)) {
      setError(
        "A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial."
      );
      return;
    }

      try {
        const response = await api.post('/users', { name, email, document, password });
        console.log('Usuário cadastrado:', response.data); 
        navigate('/login'); 
      } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        setError('Erro ao cadastrar usuário. Tente novamente.');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Cadastro</h2>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Document">CPF:</label>
          <input
            type="text"
            id="document"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="button-container">
          <button type="submit" className="register-button">Cadastrar</button>
        </div>
      </form>
    );
  };
  
  export default RegisterForm;