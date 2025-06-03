import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from '../Components/LogoutButton';

export default function Estoque() {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [unidade, setUnidade] = useState('');
  const [quantidadeNova, setQuantidadeNova] = useState(0);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  useEffect(() => {
    buscarEstoque();
  }, []);

  const buscarEstoque = async () => {
    try {
      const resposta = await axios.get('http://localhost:3003/estoque');
      setItens(resposta.data);
    } catch (err) {
      alert('Erro ao buscar estoque.');
    }
  };

  const adicionarItem = async () => {
    try {
      await axios.post('http://localhost:3003/estoque', {
        nome,
        quantidade,
        unidade,
      });
      setNome('');
      setQuantidade(0);
      setUnidade('');
      buscarEstoque();
    } catch (err) {
      alert('Erro ao adicionar item.');
    }
  };

  const atualizarQuantidade = async () => {
    try {
      await axios.put(`http://localhost:3003/estoque/${itemSelecionado}`, null, {
        params: { quantidade: quantidadeNova },
      });
      setItemSelecionado(null);
      setQuantidadeNova(0);
      buscarEstoque();
    } catch (err) {
      alert('Erro ao atualizar quantidade.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Estoque</h2>
        <LogoutButton />
      </div>

      <div className="mb-4">
        <h4>Adicionar novo item</h4>
        <input
          type="text"
          placeholder="Nome"
          className="form-control mb-2"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="form-control mb-2"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Unidade (ex: kg, un, pacote)"
          className="form-control mb-2"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={adicionarItem}>
          Adicionar Item
        </button>
      </div>

      <h4>Lista de Itens em Estoque</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Unidade</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item._id}>
              <td>{item.nome}</td>
              <td>{item.quantidade}</td>
              <td>{item.unidade}</td>
              <td>
                {itemSelecionado === item._id ? (
                  <>
                    <input
                      type="number"
                      value={quantidadeNova}
                      onChange={(e) => setQuantidadeNova(Number(e.target.value))}
                      className="form-control mb-2"
                    />
                    <button className="btn btn-primary btn-sm" onClick={atualizarQuantidade}>
                      Salvar
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setItemSelecionado(item._id)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
