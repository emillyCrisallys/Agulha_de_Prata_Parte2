import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import RegisterForm from "./pages/Cadastro";
import Cart from "./pages/Cart";
import UserPerfil from "./pages/UserPerfil";
import Contact from "./pages/Contact";
import Compra from "./pages/Compra";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Cadastro" element={<RegisterForm />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/UserPerfil" element={<UserPerfil />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Compra" element={<Compra />} />
      </Routes>
    </Router>
  );
};

export default App;