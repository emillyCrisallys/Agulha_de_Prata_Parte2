import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/UserPerfil.css";
import logo from "../img/Logo_site.png";
import carrinho from "../img/carrinho.png";


type ErrorFields = {
  name?: string;
  password?: string;
  confirmPassword?: string;
  api?: string;
};
const UserPerfil = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [document, setDocument] = useState("");

  const [errors, setErrors] = useState<ErrorFields>({});
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    if (userId) {
      api
        .get(`/users/Perfil/${userId}`)
        .then((res) => {
          setName(res.data.name);
          setDocument(res.data.document);
        })
        .catch((err) => {
          setErrors({ api: "Erro ao buscar dados do usuário." });
          console.error("Erro ao buscar dados:", err);
        });
    }
  }, [userId]);

  const handleUpdate = async () => {
    const newErrors: ErrorFields = {};
    setSuccessMessage("");

    // Permite atualizar nome OU senha (ou ambos)
    if (!name.trim() && !password.trim()) {
      newErrors.name = "Preencha pelo menos um campo para atualizar.";
      setErrors(newErrors);
      return;
    }

    if (password) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirme a senha.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem.";
      }
      const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!senhaValida.test(password)) {
        newErrors.password =
          "A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um caractere especial.";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await api.put(`/users/Perfil/${userId}`, {
        name: name.trim() ? name : undefined,
        password: password.trim() ? password : undefined,
      });

      setSuccessMessage("Alterado com sucesso!");
      setErrors({});
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      console.error("Erro ao atualizar perfil:", error);

      let responseMessage: string | undefined;

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: unknown }).response !== null
      ) {
        const response = (error as { response?: { data?: { error?: string; message?: string } } }).response;
        if (response && "data" in response) {
          const data = response.data;
          responseMessage = data?.error || data?.message;
        }
      }

      setErrors({
        api: responseMessage || "Erro inesperado ao atualizar perfil.",
      });
    }
  };
   const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")) {
      return;
    }
    try {
      await api.delete(`/users/Perfil/${userId}`);
      localStorage.clear();
      navigate("/login");
    } catch {
      setErrors({
        api: "Erro ao excluir conta. Tente novamente.",
      });
    }
  };

  return (
    <div>
         <nav>
        <div className="logo">
          <a href="/Home">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="nav-links">
          <a href="/Home">Home</a>
          <a href="/Contact">Contato</a>
          <a href="/UserPerfil">Perfil</a>
          <a href="/Cart">
            <img
              src={carrinho}
              alt="Carrinho"
              className="cart-icon"
            />
          </a>
        </div>
      </nav>
    
      <h1 className="editar-perfil-text">Editar Perfil</h1>

      {successMessage && <p className="success-msg">{successMessage}</p>}

      <div className="container-editar">
        <div className="form-group">
          <label htmlFor="document">
            CPF (apenas leitura):
          </label>
          <input
            id="document"
            className="form-input cpf-input"
            type="text"
            value={document}
            readOnly
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="name">Nome do Usuário:</label>
          <input
            id="name"
            className="form-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome de usuário"
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>

        

        <div className="form-group">
          <label htmlFor="password">Nova Senha:</label>
          <input
            id="password"
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nova senha"
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            id="confirmPassword"
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar nova senha"
          />
          {errors.confirmPassword && (
            <p className="error-msg">{errors.confirmPassword}</p>
          )}
        </div>

        {errors.api && <p className="error-msg geral">{errors.api}</p>}

        <button className="btn-editar" onClick={handleUpdate}>
          Atualizar
        </button>
        <button className="btn-excluir" onClick={handleDelete}>
          Excluir Conta
        </button>
      </div>
    </div>
  );
};

export default UserPerfil;