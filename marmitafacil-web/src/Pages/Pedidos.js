import React, { useState } from 'react';
import axios from 'axios';

export default function Pedidos() {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [preco, setPreco] = useState(0);

  const handlePedido = async () => {
    try {
      const payload = {
        produto: produto,
        quantidade: quantidade,
        preco: preco,
      };

      await axios.post('http://localhost:3002/pedidos', payload);
      alert('Pedido criado com sucesso!');

      // Limpar campos
      setProduto('');
      setQuantidade(1);
      setPreco(0);
    } catch (err) {
      alert('Erro ao criar pedido.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Novo Pedido</h2>

      <div className="mb-3">
        <label className="form-label">Produto</label>
        <input
          type="text"
          className="form-control"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Quantidade</label>
        <input
          type="number"
          min={1}
          className="form-control"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Preço Unitário</label>
        <input
          type="number"
          min={0}
          step="0.01"
          className="form-control"
          value={preco}
          onChange={(e) => setPreco(Number(e.target.value))}
        />
      </div>

      <button className="btn btn-success w-100" onClick={handlePedido}>
        Criar Pedido
      </button>
    </div>
  );
}
