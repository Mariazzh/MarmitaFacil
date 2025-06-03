import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Components/LogoutButton';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1>Bem-vinda ao Painel MarmitaFácil!</h1>
      <p>Aqui você poderá gerenciar seus pedidos, estoque e muito mais.</p>

      <button className="btn btn-primary mt-3" onClick={() => navigate('/pedidos')}>
        Criar Novo Pedido
      </button>

      <button className="btn btn-secondary mt-3 ms-3" onClick={() => navigate('/listar-pedidos')}>
        Listar Pedidos
      </button>

      <button className="btn btn-warning mt-3 ms-3" onClick={() => navigate('/estoque')}>
  Gerenciar Estoque
</button>

      <div className="mt-5">
        <LogoutButton />
      </div>
    </div>
  );
}
