import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Cart.css";
import logo from "../img/Logo_site.png";

interface Product {
  id: number;
  userId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartReturn {
  id: number;
  userId: number;
  quantity: number;
  ProductModel: Product;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const idLocalStorage = localStorage.getItem("userId");

        const { data } = await api.get(`/cart/${idLocalStorage}`);
        console.log("Dados retornados pelo backend:", data);

        if (!idLocalStorage) {
          setError("Você precisa estar logado para acessar o carrinho.");
          return;
        }

        // Mapeia os dados para garantir que quantity seja inicializado
        const mappedCart = data.map((item: CartReturn) => ({
          id: item.id,
          userId: item.userId,
          name: item.ProductModel.name,
          price: item.ProductModel.price,
          image: item.ProductModel.image,
          quantity: item.quantity || 0,
        }));

        setCart(mappedCart);
      } catch (error) {
        console.error("Erro ao buscar produtos do carrinho:", error);
        setError(
          "Erro ao buscar produtos do carrinho. Tente novamente mais tarde."
        );
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (id: number) => {
    try {
      await api.delete(`/cart/${id}`);
      setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Erro ao remover produto do carrinho:", err);
      alert("Erro ao remover produto do carrinho. Tente novamente mais tarde.");
    }
  };

const incrementQuantity = async (id: number) => {
  const product = cart.find((p) => p.id === id);
  if (!product) return;
  const newQuantity = product.quantity + 1;

  try {
    await api.put(`/cart/${id}`, { quantity: newQuantity });
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.id === id ? { ...p, quantity: newQuantity } : p
      )
    );
  } catch {
    alert("Erro ao atualizar quantidade. Tente novamente.");
  }
};

const decrementQuantity = async (id: number) => {
  const product = cart.find((p) => p.id === id);
  if (!product || product.quantity <= 1) return;
  const newQuantity = product.quantity - 1;

  try {
    await api.put(`/cart/${id}`, { quantity: newQuantity });
    setCart((prevCart) =>
      prevCart.map((p) =>
        p.id === id ? { ...p, quantity: newQuantity } : p
      )
    );
  } catch {
    alert("Erro ao atualizar quantidade. Tente novamente.");
  }
};

  const getCartTotal = () => {
    return cart
      .reduce(
        (total, product) => total + Number(product.price) * product.quantity,
        0
      )
      .toFixed(2);
  };
  console.log("Dados do carrinho:", cart);

  return (
    <div className="cart">
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

      <h1>Carrinho de Compras</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div
              key={product.id}
              id={String(product.userId)}
              className="cart-item"
            >
              <img src={product.image} alt={product.name} />
              <div>
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <div className="quantity">
                  <button
                    className="quantity-button"
                    onClick={() => incrementQuantity(product.id)}
                  >
                    +
                  </button>
                  <button
                    className="quantity-button"
                    onClick={() => decrementQuantity(product.id)}
                  >
                    -
                  </button>

                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remover
                  </button>
                </div>
                
                <p> {product.quantity}.Unid</p>
                <p>R${Number(product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
          
          <div className="cart-footer">
            <button
              className="finalizar-button"
              onClick={() => navigate("/Compra")}
          >
            Finalizar
          </button>
          <div className="total">
              <h3>Total: R${getCartTotal()}</h3>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
