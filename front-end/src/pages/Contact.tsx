import React, { useState } from "react";
import "../styles/Contact.css";
import logo from "../img/Logo_site.png";
import carrinho from "../img/carrinho.png";

const Contact: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) {
      setSuccess("Preencha todos os campos para enviar.");
      return;
    }
    // Aqui você pode integrar com um serviço de email externo se quiser
    setSuccess("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    setEmail("");
    setMessage("");
  };

  return (
    <>
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
      <div className="contact-container" style={{ maxWidth: 500, margin: "40px auto", background: "#181818", padding: 32, borderRadius: 10, color: "#f5e5d9" }}>
        <h2>Contato</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
          <textarea
            id="message"
            style={{ width: "100%", padding: 8, minHeight: 80, borderRadius: 5, border: "none", fontSize: 16, marginBottom: 12 }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button type="submit" style={{ background: "#fa900f", color: "#302a10", fontWeight: "bold", border: "none", borderRadius: 5, padding: "10px 0", width: "100%", fontSize: 16, cursor: "pointer" }}>
            Enviar
          </button>
          {success && <div style={{ color: "#4caf50", marginTop: 10 }}>{success}</div>}
        </form>

        <div className="about-store">
          <h3>Nossa História</h3>
          <p>
            Fundada em 2024, a Agulha de Prata nasceu do sonho de unir tradição e modernidade no universo do artesanato.
            Nossa loja oferece produtos exclusivos, atendimento personalizado e muito carinho em cada detalhe.
            Venha fazer parte dessa história com a gente!
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;