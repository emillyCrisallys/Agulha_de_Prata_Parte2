import React, { useEffect, useState } from "react";
import api from "../utils/api";
import logo from "../img/Logo_site.png";
import { useNavigate } from "react-router-dom";

const Compra: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const finalizarCompra = async () => {
      try {
        const idLocalStorage = localStorage.getItem("userId");
        if (!idLocalStorage) {
          setErro("Você precisa estar logado para finalizar a compra.");
          setLoading(false);
          return;
        }

        // Busca os itens do carrinho (igual ao fetchCart)
        const { data } = await api.get(`/cart/${idLocalStorage}`);
        const cart = data;

        // Atualiza o estoque para cada produto do carrinho
        for (const item of cart) {
          const inventoryRes = await api.get(`/inventory/product/${item.ProductModel.id}`);
          const estoqueAtual = inventoryRes.data.stock;
          const novoEstoque = estoqueAtual - item.quantity;
          await api.put(`/inventory/${inventoryRes.data.id}`, { stock: novoEstoque });
        }

        // Limpa o carrinho do usuário
        try {
          await api.delete(`/cart/user/${idLocalStorage}`);
        } catch (err: unknown) {
          // Se o carrinho já estiver vazio, ignora o erro 404
          type AxiosErrorResponse = {
            response?: {
              status?: number;
              data?: {
                error?: string;
              };
            };
          };
          const error = err as AxiosErrorResponse;
          if (
            typeof err === "object" &&
            err !== null &&
            "response" in err &&
            typeof error.response === "object" &&
            error.response !== null &&
            error.response.status === 404 &&
            error.response.data &&
            error.response.data.error === "Item não encontrado no carrinho."
          ) {
            // ok, segue o fluxo
          } else {
            throw err;
          }
        }

        setLoading(false);

        // Redireciona para Home após 4 segundos
        setTimeout(() => {
          navigate("/Home");
        }, 4000);

      } catch (err) {
        console.error(err);
        setErro("Erro ao finalizar a compra. Tente novamente.");
        setLoading(false);
      }
    };

    finalizarCompra();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <img src={logo} alt="Logo" style={{ width: 120, marginBottom: 24 }} />
      {loading ? (
        <h2>Processando sua compra...</h2>
      ) : erro ? (
        <h2 style={{ color: "red" }}>{erro}</h2>
      ) : (
        <h2>Obrigado pela compra! Seu pedido foi realizado com sucesso.</h2>
      )}
      {!loading && (
        <p style={{ marginTop: 24, color: "#fa900f" }}>
          Você será redirecionado para a página inicial em instantes.
        </p>
      )}
    </div>
  );
};

export default Compra;