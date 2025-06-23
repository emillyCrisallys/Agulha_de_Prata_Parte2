// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <div className="logo">Logo</div>
      <div>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/contact" style={{ marginRight: '10px' }}>Contato</Link>
        <Link to="/UserPerfil" style={{ marginRight: '10px' }}>Perfil</Link>
        <Link to="/cart">Carrinho</Link>
      </div>
    </nav>
  );
};

export default Navbar;