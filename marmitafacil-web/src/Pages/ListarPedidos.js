import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../Components/LogoutButton';

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    try {
      const resposta = await axios.get('http://localhost:3002/orders');
      setPedidos(resposta.data);
    } catch (err) {
      alert('Erro ao buscar pedidos.');
    }
  };

  const atualizarStatus = async (id, statusAtual) => {
    const proximoStatus = obterProximoStatus(statusAtual);
    try {
      await axios.put(`http://localhost:3002/orders/${id}`, { status: proximoStatus });
      buscarPedidos();
    } catch (err) {
      alert('Erro ao atualizar status.');
    }
  };

  const obterProximoStatus = (statusAtual) => {
    switch (statusAtual) {
      case 'recebido':
        return 'em produção';
      case 'em produção':
        return 'pronto';
      case 'pronto':
        return 'entregue';
      default:
        return statusAtual;
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Lista de Pedidos</h2>
        <LogoutButton />
      </div>

      {pedidos.length === 0 ? (
        <p>Nenhum pedido cadastrado ainda.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Produto(s)</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido._id}>
                <td>{pedido.cliente}</td>
                <td>
                  {pedido.itens.map((item, index) => (
                    <div key={index}>{item.produto}</div>
                  ))}
                </td>
                <td>
                  {pedido.itens.map((item, index) => (
                    <div key={index}>{item.quantidade}</div>
                  ))}
                </td>
                <td>{pedido.status}</td>
                <td>
                  {pedido.status !== 'entregue' ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => atualizarStatus(pedido._id, pedido.status)}
                    >
                      Avançar Status
                    </button>
                  ) : (
                    <span className="badge bg-success">Finalizado</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
