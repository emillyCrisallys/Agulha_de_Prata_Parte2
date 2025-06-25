import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import logo from "../img/Logo_site.png";

interface LoginResponse {
  token: string;
  userId?: string;
  id?: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("E-mail inválido.");
      return;
    }

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post<LoginResponse>("/login", {
        email,
        password,
      });
      const { token, userId, id } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId || id || "");
        console.log("Login bem-sucedido. Token e userId armazenados.");
        navigate("/Home");
        window.location.reload();
      } else {
        setError("Token não recebido. Verifique o servidor.");
        console.error("Token ausente na resposta:", response.data);
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("E-mail ou senha inválidos.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/Cadastro");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Login</h2>
        <img src={logo} alt="Logo" className="login-logo" />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="button-container">
        <button type="submit">Entrar</button>
        <button
          type="button"
          className="register-button"
          onClick={handleRegisterClick}
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
