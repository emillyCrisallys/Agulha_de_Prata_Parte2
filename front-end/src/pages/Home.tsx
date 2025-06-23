import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "../styles/HomeLay.css";
import logo from "../img/Logo_site.png";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* const handleAddToCart = async (product: Product) => {
    try {
      const storedUser = localStorage.getItem("userId");

      if (!storedUser) {
        alert("Você precisa estar logado para adicionar produtos ao carrinho.");
        return;
      }

      // Verificando se o carrinho já existe no localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productIndex = storedCart.findIndex((item: { product: Product; quantity: number }) => item.product.id === product.id);

      if (productIndex >= 0) {
        // Se o produto já estiver no carrinho, incrementar a quantidade
        storedCart[productIndex].quantity += 1;
      } else {
        // Caso o produto não esteja no carrinho, adicionar
        storedCart.push({ product, quantity: 1 });
      }

      // Atualizar carrinho no localStorage
      localStorage.setItem("cart", JSON.stringify(storedCart));
      alert("Produto adicionado ao carrinho com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar produto ao carrinho. Tente novamente mais tarde.");
    }
  };*/

  const handleAddToCart = async (product: Product) => {
    try {
      const userId = localStorage.getItem("userId");
      console.log(userId);

      if (!userId) {
        alert("Você precisa estar logado para adicionar produtos ao carrinho.");
        return;
      }

      await api.post("/cart", {
        userId: userId,
        productId: product.id,
        quantity: 1,
      });

      alert("Produto adicionado ao carrinho com sucesso!");
    } catch (err) {
      console.error(err);
      alert(
        "Erro ao adicionar produto ao carrinho. Tente novamente mais tarde."
      );
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Erro ao buscar produtos. Tente novamente mais tarde.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao buscar produtos. Tente novamente mais tarde.");
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
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
              src="/src/img/carrinho.png"
              alt="Carrinho"
              className="cart-icon"
            />
          </a>
        </div>
      </nav>

      <h1>Bem-vindo à melhor loja de Vinil do ano!</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="product-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => handleAddToCart(product)}>Comprar</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto disponível no momento.</p>
        )}
      </div>
    </main>
  );
};

export default Home;
